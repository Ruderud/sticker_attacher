import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ImageType } from "../App";

import KOHARU_18 from "../asset/koharu_18.webp";
import KOHARU_NO_HENTAI from "../asset/koharu_hentai_dame.jpg";

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
  {
    name: "KOHARU_18",
    url: KOHARU_18,
  },
  {
    name: "KOHARU_NO_HENTAI",
    url: KOHARU_NO_HENTAI,
  },
  {
    name: "KOHARU_18",
    url: KOHARU_18,
  },
  {
    name: "KOHARU_NO_HENTAI",
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
        {DEFAULT_STICKERS.map((sticker, idx) => (
          <ImageListItem
            key={sticker.name + idx}
            onClick={() => {
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
