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

import { useEffect, useState } from 'react';
import { LocalStorageData } from '../types';

export const useLocalStorageData = () => {
  const [localStorageData, setLocalStorageData] = useState<LocalStorageData[]>(
    []
  );

  const updateLocalStorageData = (payload: LocalStorageData | null) => {
    if (!payload) {
      setLocalStorageData([]);
      localStorage.removeItem('medida_canvas_data');
      return;
    }

    const updatedData = [payload, ...localStorageData];
    setLocalStorageData(updatedData);
    localStorage.setItem('medida_canvas_data', JSON.stringify(updatedData));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('medida_canvas_data');
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    // Only set the data if it's an array
    setLocalStorageData(Array.isArray(parsedData) ? parsedData : []);
  }, []);

  return { localStorageData, updateLocalStorageData };
};
