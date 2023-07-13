import { useEffect, useRef, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import { ImageType } from '../App';
import KARYL from '../asset/karyl.png';
import MOCOCO from '../asset/mococo.png';
import TERIRI from '../asset/teriri.jpg';
import KEQING from '../asset/keqing.png';

export interface Sticker {
  name: string;
  url: string;
}

const DEFAULT_STICKERS: Array<Sticker> = [
  {
    name: '각청',
    url: KEQING,
  },
  {
    name: '캬루',
    url: KARYL,
  },
  {
    name: '모코코',
    url: MOCOCO,
  },
  {
    name: '테리리',
    url: TERIRI,
  },
];

interface StickerListProps {
  image?: ImageType;
  selectedSticker?: Sticker;
  setSelectedSticker: React.Dispatch<React.SetStateAction<Sticker | undefined>>;
}

export default function StickerList({ image, selectedSticker, setSelectedSticker }: StickerListProps) {
  const selectSticker = (sticker: Sticker) => {
    if (!image) {
      alert('이미지를 먼저 가져와주세요');
      return;
    }

    setSelectedSticker(sticker);
  };

  const [stickerList, setStickerList] = useState<Sticker[]>(DEFAULT_STICKERS);
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

  useEffect(() => {
    inputRef.current.accept = 'image/*';
    inputRef.current.type = 'file';
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
          throw new Error('translate imageURL fail');
        }
        const imageURL = fileReader.result?.toString();
        setStickerList([{ name: inputImageFile.name, url: imageURL }, ...stickerList]);
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
      <Typography variant="h5" sx={{ pl: 2, fontWeight: 'bold' }}>
        사용할 스티커 선택
      </Typography>
      <ImageList
        sx={{
          width: '100%',
          height: 150,
          display: 'flex',
          flexDirection: 'row',

          marginTop: 0,
        }}
      >
        <ImageListItem
          onClick={() => {
            inputRef.current.click();
          }}
          sx={{
            minWidth: 180,
            background: 'rgba(0,0,0,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input ref={inputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
          <AddIcon
            sx={{
              fontSize: 50,
              color: 'rgb(255,255,255)',
            }}
          />
          <ImageListItemBar title={'내 스티커 가져오기'} position="bottom" />
        </ImageListItem>
        {stickerList.map((sticker, idx) => (
          <ImageListItem
            key={sticker.name + idx}
            onClick={(evt) => {
              evt.preventDefault();
              selectSticker(sticker);
            }}
          >
            <img src={`${sticker.url}`} style={{ width: 180, overflow: 'hidden' }} alt={sticker.name} loading="lazy" />
            <ImageListItemBar title={sticker.name} position="bottom" />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
}
