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

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface LocalStorageData {
  id: string;
  rectangles: Rectangle[];
  distance: number;
  createdAt: string;
}
