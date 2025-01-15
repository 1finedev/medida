/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 02:nn:41
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { useCallback, useRef, useState } from 'react';

const Canvas = () => {
  const [isFreshMount, setIsFreshMount] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearOverlay = useCallback(() => setIsFreshMount(false), []);

  return (
    <div
      className="flex-1 bg-secondary rounded-lg cursor-cell"
      onClick={clearOverlay}
    >
      {isFreshMount && (
        <p className="text-center">Click and drag on this canvas to draw</p>
      )}
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default Canvas;
