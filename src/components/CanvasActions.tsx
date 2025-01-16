/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 11:nn:54
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
    <div className="w-full flex justify-end items-end gap-4">
      {showClearButton && (
        <button
          onClick={clearCanvas}
          className="py-3 px-6 bg-red-500 rounded-lg text-text-primary font-semibold "
        >
          Clear Canvas
        </button>
      )}
      {localStorageData?.length > 0 && (
        <button
          onClick={clearLocalStorageData}
          className="py-3 px-6 bg-red-500 rounded-lg text-text-primary font-semibold "
        >
          Clear Drawing History
        </button>
      )}
      {showSaveButton && (
        <button
          onClick={persistRectangleData}
          className="py-3 px-6 bg-button-primary rounded-lg text-text-primary font-semibold"
        >
          Save Rectangles
        </button>
      )}
    </div>
  );
};

export default CanvasActions;
