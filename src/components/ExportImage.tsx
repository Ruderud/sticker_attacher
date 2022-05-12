import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

export default function ExportImage() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: window.innerWidth }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction label="Undo" value="undo" icon={<UndoIcon />} />
      <BottomNavigationAction
        label="Save"
        value="save"
        icon={<SaveAltIcon />}
      />
      <BottomNavigationAction label="Redo" value="redo" icon={<RedoIcon />} />
    </BottomNavigation>
  );
}
