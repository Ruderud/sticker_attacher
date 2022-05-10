import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ImageType } from "../App";

interface OptionsProps {
  setImage: React.Dispatch<React.SetStateAction<ImageType | undefined>>;
}

export default function TopBar({ setImage }: OptionsProps) {
  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;

    const inputImageFile = evt.target.files[0];

    let fileReader = new FileReader();

    try {
      fileReader.readAsDataURL(inputImageFile);
      fileReader.onerror = () => {
        throw new Error("can't read file");
      };
      fileReader.onload = () => {
        if (fileReader.result === null || fileReader.result === undefined) {
          throw new Error("translate imageURL fail");
        }
        const imageURL = fileReader.result?.toString();
        setImage({
          file: inputImageFile,
          url: imageURL,
        });
      };
    } catch (err) {
      console.log(`Error message: ${err}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <label htmlFor="contained-button-file" style={{ marginLeft: "auto" }}>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
