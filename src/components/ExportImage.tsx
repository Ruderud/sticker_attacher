import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { SyntheticEvent, useRef, useState } from "react";

export default function ExportImage() {
  const [value, setValue] = useState("recents");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const exportImageLayer = useRef<HTMLCanvasElement>(null);

  const exportImage = () => {
    const canvas = exportImageLayer.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    canvas.width = canvas.width;
  };

  return (
    <BottomNavigation
      sx={{ width: window.innerWidth, position: "fixed", bottom: 0 }}
      value={value}
      onChange={handleChange}
    >
      {/* <BottomNavigationAction label="Undo" value="undo" icon={<UndoIcon />} /> */}
      <BottomNavigationAction
        label="Save"
        value="save"
        icon={<SaveAltIcon />}
        onMouseUp={exportImage}
      />
      {/* <BottomNavigationAction label="Redo" value="redo" icon={<RedoIcon />} /> */}
    </BottomNavigation>
  );
}
