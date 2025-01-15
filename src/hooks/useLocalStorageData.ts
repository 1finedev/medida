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

import { LocalStorageData } from '@app/types';
import { useEffect, useState } from 'react';

export const useLocalStorageData = () => {
  const [localStorageData, setLocalStorageData] = useState<LocalStorageData[]>(
    []
  );

  const updateLocalStorageData = (payload: LocalStorageData) => {
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
