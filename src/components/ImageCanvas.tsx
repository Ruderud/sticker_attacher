import { useEffect, useRef } from "react";
import { Paper } from "@mui/material";
import { ImageType } from "../App";

export enum DEFAULT_LAYER_SIZE {
  WIDTH = 500,
  HEIGHT = 500,
}

interface ImageCanvasProps {
  image?: ImageType;
}

export default function ImageCanvas({ image }: ImageCanvasProps) {
  const rawImageLayer = useRef<HTMLCanvasElement>(null);

  const drawRawImageLayer = () => {
    if (image === undefined) return;

    console.log(image);

    const canvas = rawImageLayer.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.clearRect(
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH,
      DEFAULT_LAYER_SIZE.HEIGHT
    );

    const img = new Image();
    img.src = image?.url;
    img.onload = () => {
      drawResizedImageLayer({
        image: img,
        //   imageSizeRatio,
        canvasCtx,
        //   setLayerSize,
      });
      //   setMaginificationRate(layerSize.width / img.width);
    };
  };

  useEffect(drawRawImageLayer, [image]);

  return (
    <Paper elevation={10}>
      <canvas
        ref={rawImageLayer}
        // className="cropArea__rawImageLayer"
        // width={layerSize.width}
        // height={layerSize.height}
        width={DEFAULT_LAYER_SIZE.WIDTH}
        height={DEFAULT_LAYER_SIZE.HEIGHT}
      />
    </Paper>
  );
}

interface DrawResizedImageParams {
  image: HTMLImageElement;
  // imageSizeRatio: number;
  canvasCtx: CanvasRenderingContext2D;
  // setLayerSize: React.Dispatch<React.SetStateAction<Layer>>;
}

const drawResizedImageLayer = ({
  image,
  // imageSizeRatio,
  canvasCtx,
}: // setLayerSize,
DrawResizedImageParams): void => {
  if (
    image.width <= DEFAULT_LAYER_SIZE.WIDTH &&
    image.height <= DEFAULT_LAYER_SIZE.HEIGHT
  ) {
    //   setLayerSize({ width: image.width, height: image.height });
    canvasCtx.drawImage(image, 0, 0, image.width, image.height);
    return;
  }

  const ratio = image.height / image.width;

  if (image.width > image.height) {
    //   setLayerSize({
    //     width: DEFAULT_LAYER_SIZE.WIDTH,
    //     height: DEFAULT_LAYER_SIZE.HEIGHT * ratio,
    //   });
    canvasCtx.drawImage(
      image,
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH,
      DEFAULT_LAYER_SIZE.HEIGHT * ratio
    );
    return;
  }

  if (image.width <= image.height) {
    //   setLayerSize({
    //     width: DEFAULT_LAYER_SIZE.WIDTH / ratio,
    //     height: DEFAULT_LAYER_SIZE.HEIGHT,
    //   });
    canvasCtx.drawImage(
      image,
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH / ratio,
      DEFAULT_LAYER_SIZE.HEIGHT
    );
    return;
  }

  canvasCtx.drawImage(
    image,
    0,
    0,
    DEFAULT_LAYER_SIZE.WIDTH,
    DEFAULT_LAYER_SIZE.HEIGHT
  );
};
