import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

import KOHARU_18 from "../asset/koharu_18.webp";
import KOHARU_NO_HENTAI from "../asset/koharu_hentai_dame.jpg";

interface Sticker {
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

export default function StickerList() {
  return (
    <Paper elevation={10}>
      <Typography variant="h5">사용할 스티커 선택</Typography>
      <ImageList
        sx={{
          width: "100%",
          height: 150,
          display: "flex",
          flexDirection: "row",
          background: "gray",
          marginTop: 0,
        }}
      >
        {DEFAULT_STICKERS.map((item) => (
          <ImageListItem key={item.name}>
            <img
              src={`${item.url}`}
              style={{ width: 180, overflow: "hidden" }}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar title={item.name} position="below" />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
}
