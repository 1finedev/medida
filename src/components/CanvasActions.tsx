/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 12:nn:42
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { useLocalStorageData } from '../hooks/useLocalStorageData';

interface CanvasActionsProps {
  clearCanvas: () => void;
  persistRectangleData: () => void;
  showSaveButton: boolean;
  showClearButton: boolean;
}
const CanvasActions = ({
  clearCanvas,
  showSaveButton,
  showClearButton,
  persistRectangleData
}: CanvasActionsProps) => {
  const { localStorageData, clearLocalStorageData } = useLocalStorageData();

  return (
    <div className="flex items-end justify-end w-full gap-4 mb-6 md:mb-2">
      {showClearButton && (
        <button
          onClick={clearCanvas}
          className="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg md:font-semibold md:text-base md:py-3 md:px-6 text-text-primary"
        >
          Clear Canvas
        </button>
      )}
      {localStorageData?.length > 0 && (
        <button
          onClick={clearLocalStorageData}
          className="px-4 py-2 text-sm font-medium bg-red-500 rounded-lg md:font-semibold md:text-base md:py-3 md:px-6 text-text-primary"
        >
          Clear History
        </button>
      )}
      {showSaveButton && (
        <button
          onClick={persistRectangleData}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-button-primary md:font-semibold md:text-base md:py-3 md:px-6 text-text-primary"
        >
          Save Rectangles
        </button>
      )}
    </div>
  );
};

export default CanvasActions;
