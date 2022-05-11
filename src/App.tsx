import { Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import ExportImage from "./components/ExportImage";
import ImageCanvas from "./components/ImageCanvas";
import StickerList, { Sticker } from "./components/StickerList";
import TopBar from "./components/TopBar";

export type ImageType = {
  file: File;
  url: string;
};

export default function App() {
  const [image, setImage] = useState<ImageType | undefined>();
  const [selectedSticker, setSelectedSticker] = useState<Sticker>();

  return (
    <AppComponent>
      <TopBar setImage={setImage} />
      <StickerList
        image={image}
        selectedSticker={selectedSticker}
        setSelectedSticker={setSelectedSticker}
      />
      <ImageCanvas
        selectedSticker={selectedSticker}
        setSelectedSticker={setSelectedSticker}
        image={image}
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
