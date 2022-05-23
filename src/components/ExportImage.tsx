import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import SaveIcon from "@mui/icons-material/Save";
import { useRef, useState } from "react";
import { Fab } from "@mui/material";
import { ImageType, StickerLog } from "../App";

interface ExportImageProps {
  image?: ImageType;
  stickerLog: StickerLog;
}

export default function ExportImage({ image, stickerLog }: ExportImageProps) {
  const exportImageLayer = useRef<HTMLCanvasElement>(null);
  const exportImage = () => {
    console.log(image, stickerLog);
    const canvas = exportImageLayer.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    canvas.width = canvas.width;
  };

  return (
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
      <SaveIcon />
    </Fab>
  );
}
