import { Button, IconButton, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { styled } from '@mui/system';

import { StickerState } from './index';
import { Sticker } from '../StickerList';

const CONTROL_TAB_HEIGHT = 50;

interface ControlTabProps {
  fixSticker: () => void;
  sticker: StickerState;
  setSticker: React.Dispatch<React.SetStateAction<StickerState>>;
  setSelectedSticker: React.Dispatch<React.SetStateAction<Sticker | undefined>>;
}

export const ControlTab = ({ fixSticker, sticker, setSticker, setSelectedSticker }: ControlTabProps) => {
  return (
    <ControlTabComponent>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        size="large"
        onClick={() => {
          setSticker({
            ...sticker,
            width: sticker.width + 10,
            height: sticker.height + 10,
          });
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        size="large"
        onClick={() => {
          if (sticker.width <= 10) return;
          setSticker({
            ...sticker,
            width: sticker.width - 10,
            height: sticker.height - 10,
          });
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={fixSticker}>
        붙이기
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          setSelectedSticker(undefined);
        }}
      >
        취소
      </Button>
      {/* <Button
          variant="contained"
          color="primary"
          disabled={stickerLog.pointer <= 0 ? true : false}
          onClick={() => {
            setStickerLog({
              ...stickerLog,
              pointer: stickerLog.pointer - 1,
            });
          }}
        >
          undo
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            stickerLog.pointer >= stickerLog.logArray.length ? true : false
          }
          onClick={() => {
            setStickerLog({
              ...stickerLog,
              pointer: stickerLog.pointer + 1,
            });
          }}
        >
          redo
        </Button> */}
    </ControlTabComponent>
  );
};

export default ControlTab;

const ControlTabComponent = styled('div')({
  borderBottom: '1px solid black',
  height: CONTROL_TAB_HEIGHT,
  display: 'flex',
  alignItems: 'center',
});
