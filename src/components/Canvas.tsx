/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 10:nn:26
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
  const { clearCanvas, draw, startDrawing, stopDrawing, isDrawingDisabled } =
    useCanvas(canvasRef);

  return (
    <div>
      <CanvasActions clearCanvas={clearCanvas} />
      <p className="text-center text-sm mb-2">
        Click and drag on the canvas below to draw
      </p>
      <canvas
        ref={canvasRef}
        onMouseMove={draw}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className={`flex-1 bg-secondary rounded-lg ${
          isDrawingDisabled ? 'cursor-not-allowed' : 'cursor-cell'
        }`}
      ></canvas>
    </div>
  );
};

export default Canvas;
