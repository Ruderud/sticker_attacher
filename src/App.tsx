import { Box, Fab, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import ExportImage from './components/ExportImage';
import ImageCanvas, { StickerState } from './components/ImageCanvas';
import StickerList, { Sticker } from './components/StickerList';
import TopBar from './components/TopBar';

import SaveIcon from '@mui/icons-material/Save';

export type ImageType = {
  file: File;
  url: string;
};

export interface StickerTimeLine extends StickerState {
  stickerName: string;
  stickerURL: string;
}

export interface StickerLog {
  logArray: StickerTimeLine[];
  pointer: number;
}

export default function App() {
  const [image, setImage] = useState<ImageType>();
  const [selectedSticker, setSelectedSticker] = useState<Sticker>();
  const [stickerLog, setStickerLog] = useState<StickerLog>({
    logArray: [],
    pointer: 0,
  });
  const [rawImageRatio, setRawImageRatio] = useState<number>(1);

  const onImageUpload = (file: File) => {
    let fileReader = new FileReader();

    try {
      fileReader.readAsDataURL(file);
      fileReader.onerror = () => {
        throw new Error("can't read file");
      };
      fileReader.onload = () => {
        if (fileReader.result === null || fileReader.result === undefined) {
          throw new Error('translate imageURL fail');
        }
        const imageURL = fileReader.result?.toString();
        setImage({
          file,
          url: imageURL,
        });
      };
    } catch (err) {
      console.log(`Error message: ${err}`);
    }
  };

  useEffect(() => {
    setStickerLog({
      logArray: [],
      pointer: 0,
    });
    setSelectedSticker(undefined);
  }, [image]);
  return (
    <AppComponent>
      <TopBar />
      <StickerList image={image} selectedSticker={selectedSticker} setSelectedSticker={setSelectedSticker} />
      <ImageCanvas
        image={image}
        selectedSticker={selectedSticker}
        setSelectedSticker={setSelectedSticker}
        stickerLog={stickerLog}
        setStickerLog={setStickerLog}
        setRawImageRatio={setRawImageRatio}
        onImageUpload={onImageUpload}
      />
      <ExportImage image={image} stickerLog={stickerLog} rawImageRatio={rawImageRatio} />
    </AppComponent>
  );
}

const AppComponent = styled('div')({
  background: '#ffffff',
});
