import { useEffect, useRef } from "react";

export const useCanvasRef = (
  canvasWidth: number = 100,
  canvasHeight: number = 300,
  animate?: (canvasCtx: CanvasRenderingContext2D) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext("2d");

    const setCanvas = () => {
      //사용자 디바이스 픽셀비율 최적화
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      if (canvas && canvasCtx) {
        canvas.style.width = String(canvasWidth) + "px";
        canvas.style.height = String(canvasHeight) + "px";

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;
      }
    };
    setCanvas();

    if (animate) {
      let reqId: number;
      const reqAnimation = () => {
        reqId = window.requestAnimationFrame(reqAnimation);

        if (canvasCtx && animate) {
          animate(canvasCtx);
        }
      };
      reqAnimation();

      return () => {
        window.cancelAnimationFrame(reqId);
      };
    }
  }, [canvasWidth, canvasHeight]);

  return canvasRef;
};

export default useCanvasRef;
