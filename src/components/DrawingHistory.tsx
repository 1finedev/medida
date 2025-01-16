/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 01:nn:00
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { useLocalStorageData } from '../hooks/useLocalStorageData';

const DrawingHistory = () => {
  const {
    localStorageData,
    restoreDrawing,
    deleteDrawing,
    restoredDrawing,
    filterList
  } = useLocalStorageData();

  return (
    <div className="w-full min-w-[80vw] overflow-auto">
      <h3 className="mb-6 text-2xl text-center uppercase text-bold">
        Drawing History
      </h3>

      <div className="flex mb-4">
        <label htmlFor="filter" className="mr-2 text-sm lg:text-base">
          Filter by:
        </label>
        <select
          id="filter"
          className="p-2 text-sm text-white border rounded bg-secondary lg:text-base"
          onChange={(e) => filterList(e.target.value)}
        >
          <option value="">Select filter</option>
          <option value="distance">Distance</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>
      <table className="w-full border border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-xs text-left border lg:text-base">
              Rect 1 (WxH)
            </th>
            <th className="p-2 text-xs text-left border lg:text-base">
              Rect 2 (WxH)
            </th>
            <th className="p-2 text-xs text-left border lg:text-base">
              Distance
            </th>
            <th className="p-2 text-xs text-left border lg:text-base">
              Created At
            </th>
            <th className="p-2 text-xs text-left lg:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localStorageData.map((item) => (
            <tr
              key={item.id}
              className={`${
                restoredDrawing?.id === item.id ? 'bg-secondary' : ''
              }`}
            >
              {item.rectangles.map((rectangle) => (
                <td
                  key={rectangle.id}
                  className="p-2 text-xs border lg:text-sm"
                >
                  {`${rectangle.width}x${rectangle.height}`}
                </td>
              ))}
              <td className="p-2 text-xs border lg:text-sm">{item.distance}</td>
              <td className="p-2 text-xs border lg:text-sm">
                {new Date(item.createdAt).toLocaleString()}
              </td>
              <div className="flex items-center justify-center border border-b-0">
                <td
                  className="flex items-center justify-center flex-1 border-r"
                  onClick={() => restoreDrawing(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="text-center lucide lucide-between-vertical-end stroke-yellow-500"
                  >
                    <rect width="7" height="13" x="3" y="3" rx="1" />
                    <path d="m9 22 3-3 3 3" />
                    <rect width="7" height="13" x="14" y="3" rx="1" />
                  </svg>
                </td>
                <td
                  className="flex items-center justify-center flex-1"
                  onClick={() => deleteDrawing(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trash-2 stroke-red-500"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrawingHistory;
