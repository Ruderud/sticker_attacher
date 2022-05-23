import SaveIcon from "@mui/icons-material/Save";
import { useRef } from "react";
import { Fab } from "@mui/material";
import { ImageType, StickerLog } from "../App";

import imageLoad from "./utils/imageLoad";

interface ExportImageProps {
  image?: ImageType;
  stickerLog: StickerLog;
  rawImageRatio: number;
}

export default function ExportImage({
  image,
  stickerLog,
  rawImageRatio,
}: ExportImageProps) {
  const exportImageLayer = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const resultImgRef = useRef<HTMLImageElement>(document.createElement("img"));

  const linkElement = useRef<HTMLAnchorElement>(document.createElement("a"));
  const exportImage = async () => {
    const canvas = exportImageLayer.current;
    if (!canvas || !image) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    await imageLoad(image.url).then((rawImage) => {
      canvas.width = rawImage.width;
      canvas.height = rawImage.height;
      canvasCtx.drawImage(rawImage, 0, 0, rawImage.width, rawImage.height);
    });

    await Promise.all(
      stickerLog.logArray.map(async (sticker) => {
        const rawSticker = await imageLoad(sticker.stickerURL);
        canvasCtx.drawImage(
          rawSticker,
          sticker.x / rawImageRatio,
          sticker.y / rawImageRatio,
          sticker.width / rawImageRatio,
          sticker.height / rawImageRatio
        );
      })
    );

    await resultImageDownload(
      exportImageLayer.current,
      linkElement.current,
      resultImgRef.current
    ).then((target) => target.click());
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        onClick={exportImage}
      >
        <img ref={resultImgRef} style={{ display: "none" }} />
        <SaveIcon />
      </Fab>
    </div>
  );
}

const resultImageDownload = (
  layer: HTMLCanvasElement,
  target: HTMLAnchorElement,
  resultImg: HTMLImageElement
): Promise<HTMLAnchorElement> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resultImage = await imageLoad(layer.toDataURL("image/png", 1.0));
      resultImg.src = resultImage.src;
      resultImg.alt = "result";
      console.log(resultImage);
      target.download = "newImage.png";
      target.href = resultImage.src;
      target.title = "result";
      // target.setAttribute("download", "newImage.png");
      // target.setAttribute("href", resultImage);
      return resolve(target);
    } catch (error) {
      return reject(error);
    }
  });
};
