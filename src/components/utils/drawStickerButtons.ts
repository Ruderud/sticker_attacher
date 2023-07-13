import { STICKER_BUTTON_SPEC, StickerState } from '../ImageCanvas';

export const drawStickerButtons = (canvasCtx: CanvasRenderingContext2D, sticker: StickerState) => {
  // Circle Button (+)
  const radius = STICKER_BUTTON_SPEC.radius;
  const buttonMargin = STICKER_BUTTON_SPEC.margin;
  const centerX_Plus = sticker.x + radius + buttonMargin;
  const centerY_Plus = sticker.height + sticker.y + radius + buttonMargin;
  canvasCtx.beginPath();
  canvasCtx.arc(centerX_Plus, centerY_Plus, radius, 0, 2 * Math.PI);
  canvasCtx.fillStyle = 'rgb(0, 99, 237)';
  canvasCtx.fill();
  // Button Plus
  const plusSize = radius;
  const lineWidth = 3;
  // Draw horizontal line
  canvasCtx.beginPath();
  canvasCtx.moveTo(centerX_Plus - plusSize / 2, centerY_Plus);
  canvasCtx.lineTo(centerX_Plus + plusSize / 2, centerY_Plus);
  canvasCtx.strokeStyle = 'white';
  canvasCtx.lineWidth = lineWidth;
  canvasCtx.stroke();
  // Draw vertical line
  canvasCtx.beginPath();
  canvasCtx.moveTo(centerX_Plus, centerY_Plus - plusSize / 2);
  canvasCtx.lineTo(centerX_Plus, centerY_Plus + plusSize / 2);
  canvasCtx.strokeStyle = 'white';
  canvasCtx.lineWidth = lineWidth;
  canvasCtx.stroke();

  const centerX_Minus = sticker.x + radius * 3 + buttonMargin * 3;
  const centerY_Minus = sticker.height + sticker.y + radius + buttonMargin;
  // Circle Button (-)
  canvasCtx.beginPath();
  canvasCtx.arc(centerX_Minus, centerY_Minus, radius, 0, 2 * Math.PI);
  canvasCtx.fillStyle = 'rgb(230, 100, 30)';
  canvasCtx.fill();
  // Draw horizontal line
  canvasCtx.beginPath();
  canvasCtx.moveTo(centerX_Minus - plusSize / 2, centerY_Minus);
  canvasCtx.lineTo(centerX_Minus + plusSize / 2, centerY_Minus);
  canvasCtx.strokeStyle = 'white';
  canvasCtx.lineWidth = lineWidth;
  canvasCtx.stroke();
  // Draw vertical line

  // Draw Paste Button
  const pasteWidth = STICKER_BUTTON_SPEC.pasteWidth;
  const pasteHeight = STICKER_BUTTON_SPEC.pasteHeight;
  const centerX_Paste = sticker.x + radius * 6 + buttonMargin * 6;
  const centerY_Paste = sticker.height + sticker.y + radius + buttonMargin;

  canvasCtx.fillStyle = 'green';
  canvasCtx.fillRect(centerX_Paste - pasteWidth / 2, centerY_Paste - pasteHeight / 2, pasteWidth, pasteHeight);

  canvasCtx.font = 'bold 1rem Arial';
  canvasCtx.textAlign = 'center';
  canvasCtx.textBaseline = 'middle';
  canvasCtx.fillStyle = 'white';
  canvasCtx.fillText('Paste', centerX_Paste, centerY_Paste);

  // Draw Delete Button
  const centerX_Delete = sticker.x + sticker.width;
  const centerY_Delete = sticker.y;
  canvasCtx.beginPath();
  canvasCtx.arc(centerX_Delete, centerY_Delete, radius / 2, 0, 2 * Math.PI);
  canvasCtx.fillStyle = 'grey';
  canvasCtx.fill();

  canvasCtx.strokeStyle = 'white';
  canvasCtx.lineWidth = 2;
  canvasCtx.beginPath();
  canvasCtx.moveTo(centerX_Delete - radius / 4, centerY_Delete - radius / 4);
  canvasCtx.lineTo(centerX_Delete + radius / 4, centerY_Delete + radius / 4);
  canvasCtx.moveTo(centerX_Delete - radius / 4, centerY_Delete + radius / 4);
  canvasCtx.lineTo(centerX_Delete + radius / 4, centerY_Delete - radius / 4);
  canvasCtx.stroke();
};
