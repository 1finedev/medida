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

import { useEffect, useRef } from 'react';
import { useLocalStorageData } from './useLocalStorageData';

export const useCanvas = (ref: React.RefObject<HTMLCanvasElement>) => {
  // a secondary ref to store the canvas context
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const { updateLocalStorageData } = useLocalStorageData();

  const clearCanvas = () => updateLocalStorageData(null);

  useEffect(() => {
    const canvas = ref.current;
    if (typeof canvas === 'undefined' || canvas === null) return;

    // set the canvas context
    const context = canvas?.getContext('2d');
    if (!context) return;

    // set the canvas context to the secondary context ref
    canvasContextRef.current = context;
  }, [ref]);

  return { clearCanvas };
};
