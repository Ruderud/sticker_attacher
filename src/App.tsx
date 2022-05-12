import { Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import ExportImage from "./components/ExportImage";
import ImageCanvas, { StickerState } from "./components/ImageCanvas";
import StickerList, { Sticker } from "./components/StickerList";
import TopBar from "./components/TopBar";

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
  const [image, setImage] = useState<ImageType | undefined>();
  const [selectedSticker, setSelectedSticker] = useState<Sticker>();
  const [stickerLog, setStickerLog] = useState<StickerLog>({
    logArray: [],
    pointer: 0,
  });

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
      />
      <ExportImage />
    </AppComponent>
  );
}

const AppComponent = styled("div")({
  // display: "grid",
  // gridTemplateRows: "10vw 20vw 40vw 10vw",
  background: "#ffffff",
});
