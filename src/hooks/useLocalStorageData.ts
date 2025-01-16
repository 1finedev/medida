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

import { createContext, useContext } from 'react';
import { StorageContextType } from '../types';

// Create a context for storage
export const StorageContext = createContext<StorageContextType>({
  localStorageData: [],
  updateLocalStorageData: () => {},
  clearLocalStorageData: () => {},
  restoreDrawing: () => {},
  deleteDrawing: () => {},
  restoredDrawing: null,
  filterList: () => {}
});

export const useLocalStorageData = () => useContext(StorageContext);
