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

export interface StorageContextType {
  localStorageData: LocalStorageData[];
  updateLocalStorageData: (payload: LocalStorageData) => void;
  clearLocalStorageData: () => void;
  restoreDrawing: (drawingId: string) => void;
  deleteDrawing: (drawingId: string) => void;
  restoredDrawing: LocalStorageData | null;
}

export interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LocalStorageData {
  canvasSizeSnapshot?: {
    width: number;
    height: number;
  };
  id: string;
  rectangles: Rectangle[];
  distance: number;
  createdAt: string;
}
