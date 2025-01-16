/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 01:nn:41
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { useRef } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import CanvasActions from './CanvasActions';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // passing the canvasRef to the useCanvas hook to ensure the hook has access to the canvas element
  const {
    clearCanvas,
    draw,
    startDrawing,
    stopDrawing,
    isDrawingDisabled,
    rectangleData,
    persistRectangleData,
    undoDrawing
  } = useCanvas(canvasRef);

  return (
    <div className="flex flex-col items-center">
      <CanvasActions
        undoDrawing={undoDrawing}
        clearCanvas={clearCanvas}
        showSaveButton={isDrawingDisabled}
        showClearButton={(rectangleData?.rectangles?.length ?? 0) > 0}
        persistRectangleData={persistRectangleData}
      />
      <p
        className={`text-xs md:text-base text-center md:text-left w-full ${
          isDrawingDisabled ? 'text-red-500' : 'text-text-primary'
        }`}
      >
        {isDrawingDisabled
          ? 'Max (2) rectangles drawn, Clear Canvas or Save Rectangles to continue'
          : 'Click and drag on the canvas below to draw'}
      </p>
      <canvas
        ref={canvasRef}
        onMouseMove={draw}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        className={`mt-4 bg-secondary rounded-lg ${
          isDrawingDisabled ? 'cursor-not-allowed' : 'cursor-cell'
        }`}
      ></canvas>
    </div>
  );
};

export default Canvas;
