/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Thu Jan 16 2025                                              *
 * Modified By: Emmanuel Bayode O.                                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { useEffect, useRef, useState } from 'react';
import { LocalStorageData, Rectangle } from '../types';
import { useLocalStorageData } from './useLocalStorageData';

const RECTANGLE_ID = String(Date.now());

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { localStorageData, updateLocalStorageData } = useLocalStorageData();

  const [isDrawingStarted, setIsDrawingStarted] = useState(false);
  const [isDrawingDisabled, setIsDrawingDisabled] = useState(false);
  const [rectangleData, setRectangleData] = useState<LocalStorageData | null>({
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
  };

  const calculateDistance = (rect1: Rectangle, rect2: Rectangle) => {
    const center1 = {
      x: rect1.x + rect1.width / 2,
      y: rect1.y + rect1.height / 2
    };
    const center2 = {
      x: rect2.x + rect2.width / 2,
      y: rect2.y + rect2.height / 2
    };
    return Math.sqrt(
      Math.pow(center2.x - center1.x, 2) + Math.pow(center2.y - center1.y, 2)
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

  const draw = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    if (!canvasRef.current || !contextRef.current || !isDrawingStarted) return;

    const { clientX, clientY } = nativeEvent;

    const latestMouseX = clientX - canvasXOffset.current;
    const latestMouseY = clientY - canvasYOffset.current;

    const rectangleWidth = latestMouseX - startPositionX.current;
    const rectangleHeight = latestMouseY - startPositionY.current;

    clearCanvas();

    if (
      Array.isArray(rectangleData?.rectangles) &&
      rectangleData.rectangles.length > 0
    ) {
      rectangleData.rectangles.forEach(drawRectangle);
    }
    drawRectangle({
      x: startPositionX.current,
      y: startPositionY.current,
      width: rectangleWidth,
      height: rectangleHeight
    });

    contextRef.current.strokeStyle = '#D3D3D3';

    const rectangle: Rectangle = {
      x: startPositionX.current,
      y: startPositionY.current,
      width: Math.abs(rectangleWidth),
      height: Math.abs(rectangleHeight)
    };

    setCurrentRectangle(rectangle);
  };

  const startDrawing = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    if (
      Array.isArray(rectangleData?.rectangles) &&
      rectangleData.rectangles.length >= 2
    )
      return;

    const { clientX, clientY } = nativeEvent;
    startPositionX.current = clientX - canvasXOffset.current;
    startPositionY.current = clientY - canvasYOffset.current;

    setIsDrawingStarted(true);
  };

  const stopDrawing = () => {
    setIsDrawingStarted(false);
    if (!currentRectangle || !Array.isArray(rectangleData?.rectangles)) return;

    setRectangleData(
      (prev) =>
        prev && {
          id: prev.id,
          rectangles: [...prev.rectangles, currentRectangle],
          distance: prev.distance,
          createdAt: prev.createdAt
        }
    );

    if (rectangleData.rectangles.length >= 2) {
      setIsDrawingDisabled(true);

      const [rect1] = rectangleData.rectangles;
      const distance = calculateDistance(rect1, currentRectangle);
      updateLocalStorageData({
        id: RECTANGLE_ID,
        rectangles: rectangleData.rectangles,
        distance,
        createdAt: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

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
      rectangleData.rectangles.forEach(drawRectangle);
    }
  }, [canvasRef, rectangleData]);

  return { clearCanvas, draw, startDrawing, stopDrawing, isDrawingDisabled };
};
