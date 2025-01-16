/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 11:nn:28
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { useLocalStorageData } from '../hooks/useLocalStorageData';

const DrawingHistory = () => {
  const { localStorageData } = useLocalStorageData();

  return (
    <div>
      <h3>Drawing History</h3>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 text-sm">Rect 1 (WxH)</th>
            <th className="border p-2 text-sm">Rect 2 (WxH)</th>
            <th className="border p-2 text-sm">Distance</th>
            <th className="border p-2 text-sm">Created At</th>
          </tr>
        </thead>
        <tbody>
          {localStorageData.map((item, index) => (
            <tr key={index}>
              {item.rectangles.map((rectangle, index) => (
                <td key={index} className="border p-2 text-xs">
                  {`${rectangle.width}x${rectangle.height}`}
                </td>
              ))}
              <td className="border p-2 text-xs">{item.distance}</td>
              <td className="border p-2 text-xs">
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrawingHistory;
