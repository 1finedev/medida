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

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorageData } from './useLocalStorageData';

export const useCanvas = (ref: React.RefObject<HTMLCanvasElement>) => {
  const { localStorageData, updateLocalStorageData } = useLocalStorageData();
  const [isDrawingStarted, setIsDrawingStarted] = useState(false);
  const [isDrawingDisabled, setIsDrawingDisabled] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const canvas = ref.current;

  // a secondary ref to store the canvas context
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const clearCanvasHistory = useCallback(() => {
    updateLocalStorageData(null);
  }, [updateLocalStorageData]);

  const clearCanvas = () => {
    if (!canvas || !canvasContextRef.current) return;
    canvasContextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // set the canvas context
    const context = canvas?.getContext('2d');
    if (!context) return;

    // set the canvas context to the secondary context ref
    canvasContextRef.current = context;
  }, [ref]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', () => () => {});
    canvas.addEventListener('mouseup', () => () => {});
    canvas.addEventListener('mousemove', () => () => {});

    return () => {
      canvas.removeEventListener('mousedown', () => () => {});
      canvas.removeEventListener('mouseup', () => () => {});
      canvas.removeEventListener('mousemove', () => () => {});
    };
  }, [localStorageData, isDrawingStarted, startPoint, ref]);

  return { clearCanvasHistory, clearCanvas, isDrawingDisabled };
};
