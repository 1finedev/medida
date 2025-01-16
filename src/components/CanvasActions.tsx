/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 03:nn:36
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { useLocalStorageData } from '../hooks/useLocalStorageData';

interface CanvasActionsProps {
  undoDrawing: () => void;
  clearCanvas: () => void;
  persistRectangleData: () => void;
  showSaveButton: boolean;
  showClearButton: boolean;
}
const CanvasActions = ({
  undoDrawing,
  clearCanvas,
  showSaveButton,
  showClearButton,
  persistRectangleData
}: CanvasActionsProps) => {
  const { localStorageData, clearLocalStorageData, restoredDrawing } =
    useLocalStorageData();

  return (
    <div className="flex items-center justify-center w-full gap-4 mb-6 md:mb-2">
      {showClearButton && (
        <>
          <button
            onClick={undoDrawing}
            className="px-4 py-2 text-sm font-medium bg-yellow-500 rounded-lg md:font-semibold md:text-base md:py-3 md:px-6 text-text-primary"
          >
            Undo
          </button>
          <button
            onClick={clearCanvas}
            className="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg md:font-semibold md:text-base md:py-3 md:px-6 text-text-primary"
          >
            Restart
          </button>
        </>
      )}

      {showSaveButton && !restoredDrawing && (
        <button
          onClick={persistRectangleData}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-button-primary md:font-semibold md:text-base md:py-3 md:px-6 text-text-primary"
        >
          Save
        </button>
      )}
      {localStorageData?.length > 0 && (
        <button
          onClick={clearLocalStorageData}
          className="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg md:font-semibold md:text-base md:py-3 md:px-6 text-text-primary"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default CanvasActions;
