import { Box, Typography } from '@mui/material';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [highlight, setHighlight] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHighlight(false);

    const file = event.dataTransfer.files[0];

    onImageUpload(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <Box
      className={`image-upload ${highlight ? 'highlight' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input id="image-input" type="file" accept="image/*" onChange={handleInputChange} style={{ display: 'none' }} />
      <label id="image-input" htmlFor="image-input">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            height: window.innerHeight * 0.5,
          }}
        >
          <UploadIcon
            sx={{
              fontSize: '4rem',
            }}
          />
          <Typography variant="h5">{highlight ? 'Drop the image here!' : 'Click or Drag Drop image'}</Typography>
        </Box>
      </label>
    </Box>
  );
};

export default ImageUpload;
