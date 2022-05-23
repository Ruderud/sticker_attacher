import { Box, Fab, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import ExportImage from "./components/ExportImage";
import ImageCanvas, { StickerState } from "./components/ImageCanvas";
import StickerList, { Sticker } from "./components/StickerList";
import TopBar from "./components/TopBar";

import SaveIcon from "@mui/icons-material/Save";

export type ImageType = {
  file: File;
  url: string;
};

export interface StickerTimeLine extends StickerState {
  stickerName: string;
  stickerURL: string;
}

export interface StickerLog {
  logArray: StickerTimeLine[];
  pointer: number;
}

export default function App() {
  const [image, setImage] = useState<ImageType>();
  const [selectedSticker, setSelectedSticker] = useState<Sticker>();
  const [stickerLog, setStickerLog] = useState<StickerLog>({
    logArray: [],
    pointer: 0,
  });
  const [rawImageRatio, setRawImageRatio] = useState<number>(1);
  return (
    <AppComponent>
      <TopBar setImage={setImage} />
      <StickerList
        image={image}
        selectedSticker={selectedSticker}
        setSelectedSticker={setSelectedSticker}
      />
      <ImageCanvas
        image={image}
        selectedSticker={selectedSticker}
        setSelectedSticker={setSelectedSticker}
        stickerLog={stickerLog}
        setStickerLog={setStickerLog}
        setRawImageRatio={setRawImageRatio}
      />
      <ExportImage
        image={image}
        stickerLog={stickerLog}
        rawImageRatio={rawImageRatio}
      />
    </AppComponent>
  );
}

const AppComponent = styled("div")({
  background: "#ffffff",
});
