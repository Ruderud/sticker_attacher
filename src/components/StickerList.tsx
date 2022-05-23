import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ImageType } from "../App";
import AddIcon from "@mui/icons-material/Add";

import KOHARU_18 from "../asset/koharu_18.webp";
import KOHARU_NO_HENTAI from "../asset/koharu_hentai_dame.png";
import { useEffect, useRef, useState } from "react";

export interface Sticker {
  name: string;
  url: string;
}

const DEFAULT_STICKERS: Array<Sticker> = [
  {
    name: "코하루 18",
    url: KOHARU_18,
  },
  {
    name: "코하루 야한건 안돼!",
    url: KOHARU_NO_HENTAI,
  },
];

interface StickerListProps {
  image?: ImageType;
  selectedSticker?: Sticker;
  setSelectedSticker: React.Dispatch<React.SetStateAction<Sticker | undefined>>;
}

export default function StickerList({
  image,
  selectedSticker,
  setSelectedSticker,
}: StickerListProps) {
  const selectSticker = (sticker: Sticker) => {
    if (!image) {
      alert("이미지를 먼저 가져와주세요");
      return;
    }

    setSelectedSticker(sticker);
  };

  const [stickerList, setStickerList] = useState<Sticker[]>(DEFAULT_STICKERS);
  const inputRef = useRef<HTMLInputElement>(document.createElement("input"));

  useEffect(() => {
    inputRef.current.accept = "image/*";
    inputRef.current.type = "file";
  }, []);

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
        setStickerList([
          { name: inputImageFile.name, url: imageURL },
          ...stickerList,
        ]);
      };
    } catch (err) {
      console.log(`Error message: ${err}`);
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        mt: 2,
      }}
    >
      <Typography variant="h5" sx={{ pl: 2, fontWeight: "bold" }}>
        사용할 스티커 선택
      </Typography>
      <ImageList
        sx={{
          width: "100%",
          height: 150,
          display: "flex",
          flexDirection: "row",

          marginTop: 0,
        }}
      >
        <ImageListItem
          onClick={() => {
            inputRef.current.click();
          }}
          sx={{
            minWidth: 180,
            background: "rgba(0,0,0,0.3)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <AddIcon
            sx={{
              fontSize: 50,
              color: "rgb(255,255,255)",
            }}
          />
          <ImageListItemBar title={"내 스티커 가져오기"} position="bottom" />
        </ImageListItem>
        {stickerList.map((sticker, idx) => (
          <ImageListItem
            key={sticker.name + idx}
            onClick={(evt) => {
              evt.preventDefault();
              selectSticker(sticker);
            }}
          >
            <img
              src={`${sticker.url}`}
              style={{ width: 180, overflow: "hidden" }}
              alt={sticker.name}
              loading="lazy"
            />
            <ImageListItemBar title={sticker.name} position="bottom" />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
}
