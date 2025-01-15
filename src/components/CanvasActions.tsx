/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 02:nn:26
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

interface CanvasActionsProps {
  clearCanvas: () => void;
}
const CanvasActions = ({ clearCanvas }: CanvasActionsProps) => {
  return (
    <div>
      <button onClick={clearCanvas}>Clear Canvas</button>
    </div>
  );
};

export default CanvasActions;
