import { Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import ExportImage from "./components/ExportImage";
import ImageCanvas from "./components/ImageCanvas";
import StickerList from "./components/StickerList";
import TopBar from "./components/TopBar";

const AppComponent = styled("div")({
  // display: "grid",
  // gridTemplateRows: "10vw 20vw 40vw 10vw",
});

export type ImageType = {
  file: File;
  url: string;
};

export default function App() {
  const [image, setImage] = useState<ImageType | undefined>();

  return (
    <AppComponent>
      <TopBar setImage={setImage} />
      <StickerList />
      <ImageCanvas image={image} />
      <ExportImage />
    </AppComponent>
  );
}
