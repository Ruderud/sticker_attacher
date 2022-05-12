import { useEffect, useRef, useState } from "react";
import { Button, IconButton, Paper } from "@mui/material";
import { ImageType, StickerLog } from "../App";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { styled } from "@mui/system";
import { Sticker } from "./StickerList";

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
}

const INITAL_CONTROLED_STICKER: StickerState = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
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
  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const stickerLayer = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({
    width: DEFAULT_LAYER_SIZE.WIDTH,
    height: DEFAULT_LAYER_SIZE.HEIGHT,
  });
  const [sticker, setSticker] = useState(INITAL_CONTROLED_STICKER);
  const [isMove, setIsMove] = useState<boolean>(false);

  const drawRawImageLayer = () => {
    if (image === undefined) return;

    const canvas = rawImageLayer.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    canvas.width = canvas.width; //초기화

    const rawImg = new Image();
    rawImg.src = image?.url;
    rawImg.onload = () => {
      const resizeHeight = rawImg.height * (canvasSize.width / rawImg.width);
      setCanvasSize({
        ...canvasSize,
        height: resizeHeight,
      });

      canvas.width = canvasSize.width;
      canvas.height = resizeHeight;
      canvasCtx.drawImage(rawImg, 0, 0, DEFAULT_LAYER_SIZE.WIDTH, resizeHeight);
    };
  };

  const drawStickerLayer = (clientX?: number, clientY?: number) => {
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

    const canvasPosition =
      canvas.getBoundingClientRect() ??
      new DOMRect(sticker.x, sticker.y, sticker.width, sticker.height);

    if (clientX && clientY) {
      setSticker({
        ...sticker,
        x: clientX - canvasPosition.x,
        y: clientY - canvasPosition.y,
      });
    }

    canvasCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.clearRect(sticker.x, sticker.y, sticker.width, sticker.height);

    const rawStickerImg = new Image();
    rawStickerImg.src = selectedSticker.url;
    rawStickerImg.onload = () => {
      //   const resizeHeight = rawSticker.height * (canvasSize.width / rawSticker.width);

      canvasCtx.drawImage(
        rawStickerImg,
        sticker.x,
        sticker.y,
        sticker.width,
        sticker.height
      );
    };
  };

  const handleStickerDown = () => {
    setIsMove(true);
  };

  const handleStickerMouseMove = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isMove) return;

    drawStickerLayer(evt.clientX, evt.clientY);
  };
  const handleStickerTouchMove = (evt: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isMove) return;

    drawStickerLayer(evt.touches[0].clientX, evt.touches[0].clientY);
  };

  const handleStickerUp = () => {
    setIsMove(false);
  };

  const fixSticker = () => {
    if (!selectedSticker) return;
    const rawImageCanvas = rawImageLayer.current;
    if (!rawImageCanvas) return;
    const rawImageCanvasCtx = rawImageCanvas.getContext("2d");
    if (!rawImageCanvasCtx) return;
    const stickerCanvas = stickerLayer.current;
    if (!stickerCanvas) return;
    const stickerCanvasCtx = stickerCanvas.getContext("2d");
    if (!stickerCanvasCtx) return;

    const rawStickerImg = new Image();
    rawStickerImg.src = selectedSticker.url;
    rawStickerImg.onload = () => {
      rawImageCanvasCtx.drawImage(
        rawStickerImg,
        sticker.x,
        sticker.y,
        sticker.width,
        sticker.height
      );
    };

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
      },
    ];
    setStickerLog({
      logArray: newStickerLogArray,
      pointer: newStickerLogArray.length,
    });
  };

  useEffect(drawRawImageLayer, [image]);
  useEffect(drawStickerLayer, [selectedSticker, sticker.width, sticker.height]);
  useEffect(() => {
    // if (stickerLog.pointer === 0) return;
    const targetStickerLogArray = stickerLog.logArray.filter(
      (log, idx) => idx < stickerLog.pointer
    );

    const canvas = rawImageLayer.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    canvas.width = canvas.width;

    //원본배경다시그림
    drawRawImageLayer();

    console.log(targetStickerLogArray);

    targetStickerLogArray.map((ele) => {
      const stickerImg = new Image();
      stickerImg.src = ele.stickerURL;
      stickerImg.onload = () => {
        canvasCtx.drawImage(stickerImg, ele.x, ele.y, ele.width, ele.height);
      };
    });
  }, [stickerLog.pointer]);

  return (
    <Paper
      elevation={10}
      sx={{
        width: canvasSize.width,
        height: canvasSize.height + CONTROL_TAB_HEIGHT,
      }} //컨트롤러 50px
    >
      <ControlTabComponent>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          size="large"
          onClick={() => {
            setSticker({
              ...sticker,
              width: sticker.width + 10,
              height: sticker.height + 10,
            });
          }}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          size="large"
          onClick={() => {
            if (sticker.width <= 10) return;
            setSticker({
              ...sticker,
              width: sticker.width - 10,
              height: sticker.height - 10,
            });
          }}
        >
          <RemoveCircleIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={fixSticker}>
          붙이기
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setSelectedSticker(undefined);
          }}
        >
          취소
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={stickerLog.pointer <= 0 ? true : false}
          onClick={() => {
            setStickerLog({
              ...stickerLog,
              pointer: stickerLog.pointer - 1,
            });
          }}
        >
          undo
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            stickerLog.pointer >= stickerLog.logArray.length ? true : false
          }
          onClick={() => {
            setStickerLog({
              ...stickerLog,
              pointer: stickerLog.pointer + 1,
            });
          }}
        >
          redo
        </Button>
      </ControlTabComponent>
      <CanvasContainerCompoent
        style={{ height: canvasSize.height, overflow: "hidden" }}
      >
        <RawImageLayerCompoent ref={rawImageLayer} />
        <StickerLayerCompoent
          ref={stickerLayer}
          onMouseDown={handleStickerDown}
          onMouseMove={handleStickerMouseMove}
          onMouseUp={handleStickerUp}
          onTouchStart={handleStickerDown}
          onTouchMove={handleStickerTouchMove}
          onTouchEnd={handleStickerUp}
        />
      </CanvasContainerCompoent>
    </Paper>
  );
}

const ControlTabComponent = styled("div")({
  borderBottom: "1px solid black",
  height: CONTROL_TAB_HEIGHT,
  display: "flex",
  alignItems: "center",
});

const CanvasContainerCompoent = styled("div")({
  position: "relative",
  touchAction: "none",
});

const RawImageLayerCompoent = styled("canvas")({
  display: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(0%, 0%)",
});

const StickerLayerCompoent = styled("canvas")({
  display: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(0%, -100.5%)",
});
