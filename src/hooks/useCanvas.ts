import React, { useEffect, useRef, useState } from 'react';
import { LocalStorageData, Rectangle } from '../types';
import { useLocalStorageData } from './useLocalStorageData';

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const RECTANGLE_ID = String(Date.now());
  const { localStorageData, updateLocalStorageData, restoredDrawing } =
    useLocalStorageData();
  const [isDrawingStarted, setIsDrawingStarted] = useState(false);
  const [isDrawingDisabled, setIsDrawingDisabled] = useState(false);
  const [rectangleData, setRectangleData] = useState<LocalStorageData>({
    id: RECTANGLE_ID,
    rectangles: localStorageData?.[0]?.rectangles || [],
    distance: 0,
    createdAt: ''
  });
  const [currentRectangle, setCurrentRectangle] = useState<Rectangle | null>(
    null
  );

  const contextRef = useRef<CanvasRenderingContext2D | null>();

  const canvasXOffset = useRef(0);
  const canvasYOffset = useRef(0);

  const startPositionX = useRef(0);
  const startPositionY = useRef(0);

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    setCurrentRectangle(null);
    setIsDrawingDisabled(false);
    setRectangleData({
      id: RECTANGLE_ID,
      rectangles: [],
      distance: 0,
      createdAt: ''
    });
  };

  const calculateDistance = (rect1: Rectangle, rect2: Rectangle): number => {
    const center1 = {
      x: rect1.x + rect1.width / 2,
      y: rect1.y + rect1.height / 2
    };
    const center2 = {
      x: rect2.x + rect2.width / 2,
      y: rect2.y + rect2.height / 2
    };
    return parseFloat(
      Math.sqrt(
        Math.pow(center2.x - center1.x, 2) + Math.pow(center2.y - center1.y, 2)
      ).toFixed(2)
    );
  };

  const drawRectangle = (rectangle: Rectangle) => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = '#D3D3D3';
    contextRef.current.strokeRect(
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height
    );
  };

  const draw = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    // Prevent all touch events immediately
    if ('touches' in event && rectangleData.rectangles.length <= 2) {
      // event.preventDefault();
      // event.stopPropagation();

      // Set touch-action CSS
      if (canvasRef.current) {
        canvasRef.current.style.touchAction = 'none';
      }
    }

    if (!canvasRef.current || !contextRef.current || !isDrawingStarted) return;

    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const latestMouseX = clientX - canvasXOffset.current;
    const latestMouseY = clientY - canvasYOffset.current;

    const rectangleWidth = latestMouseX - startPositionX.current;
    const rectangleHeight = latestMouseY - startPositionY.current;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    if (
      Array.isArray(rectangleData?.rectangles) &&
      rectangleData.rectangles.length > 0
    ) {
      rectangleData.rectangles.forEach(drawRectangle);
    }

    const rectangle: Rectangle = {
      id: String(Date.now()),
      x: startPositionX.current,
      y: startPositionY.current,
      width: Math.abs(rectangleWidth),
      height: Math.abs(rectangleHeight)
    };

    contextRef.current.strokeStyle = '#D3D3D3';
    drawRectangle(rectangle);
    setCurrentRectangle(rectangle);
  };

  const startDrawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (
      Array.isArray(rectangleData?.rectangles) &&
      rectangleData.rectangles.length >= 2
    ) {
      setIsDrawingDisabled(true);
      // Reset touch-action CSS
      if (canvasRef.current) {
        canvasRef.current.style.touchAction = 'revert';
      }
      return;
    }

    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      'touches' in event ? event.touches[0].clientY : event.clientY;
    startPositionX.current = clientX - canvasXOffset.current;
    startPositionY.current = clientY - canvasYOffset.current;

    setIsDrawingStarted(true);
  };

  const stopDrawing = () => {
    setIsDrawingStarted(false);
    if (!currentRectangle) return;

    setRectangleData((prev) => ({
      id: prev.id,
      rectangles: [...prev.rectangles, currentRectangle],
      distance: prev.distance,
      createdAt: prev.createdAt
    }));

    setCurrentRectangle(null);
    if (rectangleData.rectangles.length >= 1) {
      setIsDrawingDisabled(true);
    }
  };

  const persistRectangleData = () => {
    if (rectangleData.rectangles.length < 2) return;

    const [rect1, rect2] = rectangleData.rectangles;
    const distance = calculateDistance(rect1, rect2);

    updateLocalStorageData({
      id: RECTANGLE_ID,
      rectangles: rectangleData.rectangles,
      distance,
      createdAt: new Date().toISOString(),
      canvasSizeSnapshot: {
        width: canvasRef.current?.width || 0,
        height: canvasRef.current?.height || 0
      }
    });
    clearCanvas();
  };

  const computeCanvasDimensions = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;

    context.lineCap = 'round';
    context.lineWidth = 3;

    contextRef.current = context;

    const canvasOffset = canvas?.getBoundingClientRect();

    if (!canvasOffset) return;

    const { top, left } = canvasOffset;

    canvasXOffset.current = left;
    canvasYOffset.current = top;

    if (
      Array.isArray(rectangleData?.rectangles) &&
      rectangleData.rectangles.length > 0
    ) {
      const { canvasSizeSnapshot } = rectangleData;
      const scaleX = canvas.width / (canvasSizeSnapshot?.width || canvas.width);
      const scaleY =
        canvas.height / (canvasSizeSnapshot?.height || canvas.height);

      rectangleData.rectangles.forEach((rect) => {
        const scaledRectangle = {
          ...rect,
          x: rect.x * scaleX,
          y: rect.y * scaleY,
          width: rect.width * scaleX,
          height: rect.height * scaleY
        };
        drawRectangle(scaledRectangle);
      });
    }
  };

  const undoDrawing = () => {
    if (rectangleData.rectangles.length === 0) return;

    const updatedRectangles = [...rectangleData.rectangles];
    updatedRectangles.pop();

    setRectangleData((prev) => ({
      id: prev.id,
      rectangles: updatedRectangles,
      distance: prev.distance,
      createdAt: prev.createdAt
    }));
    setIsDrawingDisabled(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    computeCanvasDimensions();
    // listen to window resize event to adjust canvas dimensions
    window.addEventListener('resize', computeCanvasDimensions);

    return () => window.removeEventListener('resize', computeCanvasDimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, rectangleData?.rectangles?.length, rectangleData?.rectangles]);

  useEffect(() => {
    if (!restoredDrawing) return;

    setRectangleData(restoredDrawing);
    setIsDrawingDisabled(true);
  }, [restoredDrawing]);

  return {
    undoDrawing,
    computeCanvasDimensions,
    clearCanvas,
    draw,
    startDrawing,
    stopDrawing,
    isDrawingDisabled,
    rectangleData,
    persistRectangleData
  };
};
