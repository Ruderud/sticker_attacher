import { useEffect, useRef, useState } from "react";
import { Button, IconButton, Paper } from "@mui/material";
import { ImageType, StickerLog } from "../../App";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { styled } from "@mui/system";
import { Sticker } from "../StickerList";

import useCanvasRef from "../utils/useCanvasRef.js";

import KOHARU_18 from "../asset/koharu_18.webp";
import ControlTab from "./ControlTab";

export enum DEFAULT_LAYER_SIZE {
  WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight * 0.5,
}

const CONTROL_TAB_HEIGHT = 50;

export interface StickerState {
  x: number;
  y: number;
  width: number;
  height: number;
  innerClickX: number;
  innerClickY: number;
}

const INITAL_CONTROLED_STICKER: StickerState = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  innerClickX: 0,
  innerClickY: 0,
};

interface ImageCanvasProps {
  image?: ImageType;
  selectedSticker?: Sticker;
  setSelectedSticker: React.Dispatch<React.SetStateAction<Sticker | undefined>>;
  stickerLog: StickerLog;
  setStickerLog: React.Dispatch<React.SetStateAction<StickerLog>>;
}

export default function ImageCanvas({
  image,
  selectedSticker,
  setSelectedSticker,
  stickerLog,
  setStickerLog,
}: ImageCanvasProps) {
  const [canvasSize, setCanvasSize] = useState({
    width: DEFAULT_LAYER_SIZE.WIDTH,
    height: DEFAULT_LAYER_SIZE.HEIGHT,
  });
  const rawImageLayer = useCanvasRef(canvasSize.width, canvasSize.height);
  const stickerLayer = useCanvasRef(canvasSize.width, canvasSize.height);
  const [sticker, setSticker] = useState(INITAL_CONTROLED_STICKER);
  const [isMove, setIsMove] = useState<boolean>(false);

  const [rawImageElement, setRawImageElement] = useState<HTMLImageElement>();
  const [stickerImageElement, setStickerImageElement] =
    useState<HTMLImageElement>();
  const [canvasRatio, setCanvasRatio] = useState<number>(0);

  const setImage = () => {
    if (image === undefined) return;

    const rawImg = new Image();
    rawImg.src = image?.url;
    rawImg.onload = () => {
      setCanvasRatio(canvasSize.width / rawImg.width);
      const resizeHeight = rawImg.height * (canvasSize.width / rawImg.width);
      setCanvasSize({
        ...canvasSize,
        height: resizeHeight,
      });
      rawImageLayer.current!.width = canvasSize.width;
      rawImageLayer.current!.height = resizeHeight;
      setRawImageElement(rawImg);
    };
  };

  const setStickerImage = () => {
    if (selectedSticker === undefined) return;

    const rawStickerImg = new Image();
    rawStickerImg.src = selectedSticker?.url;
    rawStickerImg.width = INITAL_CONTROLED_STICKER.width;
    rawStickerImg.height = INITAL_CONTROLED_STICKER.height;
    rawStickerImg.onload = () => {
      setStickerImageElement(rawStickerImg);
    };
  };

  const drawRawImageLayer = () => {
    if (rawImageElement === undefined) return;
    const canvas = rawImageLayer.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    canvas.width = canvas.width; //초기화

    canvasCtx.drawImage(rawImageElement, 0, 0, canvas.width, canvas.height);
  };

  const drawStickerLayer = (x?: number, y?: number) => {
    if (!stickerImageElement) return;
    const canvas = stickerLayer.current;
    if (!canvas) return;

    //스티커 취소시 스티커 레이어 초기화
    if (selectedSticker === undefined) {
      setSticker(INITAL_CONTROLED_STICKER);
      canvas.width = canvas.width;
      return;
    }

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    if (x && y) {
      setSticker({
        ...sticker,
        x,
        y,
      });
    }

    canvasCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.clearRect(sticker.x, sticker.y, sticker.width, sticker.height);
    canvasCtx.drawImage(
      stickerImageElement,
      sticker.x,
      sticker.y,
      sticker.width,
      sticker.height
    );
  };

  const checkMouseOnSticker = (clientX: number, clientY: number): boolean => {
    const canvas = stickerLayer.current;
    if (!canvas) return false;
    const canvasPosition =
      canvas.getBoundingClientRect() ??
      new DOMRect(sticker.x, sticker.y, sticker.width, sticker.height);

    if (
      sticker.x + canvasPosition.x - 10 <= clientX &&
      clientX <= sticker.x + canvasPosition.x + sticker.width + 10 &&
      sticker.y + canvasPosition.y - 10 <= clientY &&
      clientY <= sticker.y + canvasPosition.y + sticker.height + 10
    ) {
      setSticker({
        ...sticker,
        innerClickX: clientX - canvasPosition.x - sticker.x,
        innerClickY: clientY - canvasPosition.y - sticker.y,
      });
      return true;
    }

    return false;
  };

  const handleStickerMouseDown = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsMove(checkMouseOnSticker(evt.clientX, evt.clientY));
  };

  const handleStickerTouchDown = (evt: React.TouchEvent<HTMLCanvasElement>) => {
    setIsMove(
      checkMouseOnSticker(evt.touches[0].clientX, evt.touches[0].clientY)
    );
  };

  const handleStickerMouseMove = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isMove) return;
    const [x, y] = setCoordinates(rawImageLayer, [evt.clientX, evt.clientY]);
    drawStickerLayer(x, y);
  };
  const handleStickerTouchMove = (evt: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isMove) return;

    const [x, y] = setCoordinates(rawImageLayer, [
      evt.touches[0].clientX,
      evt.touches[0].clientY,
    ]);

    drawStickerLayer(x, y);
  };

  const handleStickerUp = () => {
    setIsMove(false);
  };

  const fixSticker = () => {
    if (!selectedSticker || !stickerImageElement) return;
    const rawImageCanvas = rawImageLayer.current;
    if (!rawImageCanvas) return;
    const rawImageCanvasCtx = rawImageCanvas.getContext("2d");
    if (!rawImageCanvasCtx) return;
    const stickerCanvas = stickerLayer.current;
    if (!stickerCanvas) return;
    const stickerCanvasCtx = stickerCanvas.getContext("2d");
    if (!stickerCanvasCtx) return;

    rawImageCanvasCtx.drawImage(
      stickerImageElement,
      sticker.x * window.devicePixelRatio ?? 1,
      sticker.y * window.devicePixelRatio ?? 1,
      sticker.width * window.devicePixelRatio ?? 1,
      sticker.height * window.devicePixelRatio ?? 1
    );
    // };

    //선택스티커 & 스티커 캔버스 초기화
    setSticker(INITAL_CONTROLED_STICKER);
    stickerCanvas.width = stickerCanvas.width;
    setSelectedSticker(undefined);

    //캔버스로그 갱신
    const newStickerLogArray = [
      ...stickerLog.logArray,
      {
        stickerName: selectedSticker.name,
        stickerURL: selectedSticker.url,
        x: sticker.x,
        y: sticker.y,
        width: sticker.width,
        height: sticker.height,
        innerClickX: 0,
        innerClickY: 0,
      },
    ];
    setStickerLog({
      logArray: newStickerLogArray,
      pointer: newStickerLogArray.length,
    });
  };

  useEffect(setImage, [image]);
  useEffect(drawRawImageLayer, [rawImageElement]);
  useEffect(setStickerImage, [selectedSticker]);
  useEffect(drawStickerLayer, [stickerImageElement, sticker]);

  return (
    <Paper
      elevation={10}
      sx={{
        width: canvasSize.width,
        height: canvasSize.height + CONTROL_TAB_HEIGHT,
      }}
    >
      <ControlTab
        fixSticker={fixSticker}
        sticker={sticker}
        setSticker={setSticker}
        setSelectedSticker={setSelectedSticker}
      />
      <CanvasContainerCompoent
        style={{
          height: canvasSize.height,
          overflow: "hidden",
          touchAction: selectedSticker ? "none" : "auto",
        }}
      >
        <RawImageLayerCompoent ref={rawImageLayer} />
        <StickerLayerCompoent
          ref={stickerLayer}
          onMouseDown={handleStickerMouseDown}
          onMouseMove={handleStickerMouseMove}
          onMouseUp={handleStickerUp}
          onTouchStart={handleStickerTouchDown}
          onTouchMove={handleStickerTouchMove}
          onTouchEnd={handleStickerUp}
        />
      </CanvasContainerCompoent>
    </Paper>
  );
}

const setCoordinates = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  [x, y]: number[]
): number[] => {
  const canvasPosition =
    canvasRef.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
  const coordination = [(x - canvasPosition.x) * 1, (y - canvasPosition.y) * 1];
  return coordination;
};

const CanvasContainerCompoent = styled("div")({
  position: "relative",
  touchAction: "auto",
  paddingBottom: 80,
});

const RawImageLayerCompoent = styled("canvas")({
  //   display: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(0%, 0%)",
});

const StickerLayerCompoent = styled("canvas")({
  //   display: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(0%, -100.6%)",
});
