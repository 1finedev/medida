import React, { useEffect, useState } from 'react';
import { StorageContext } from '../hooks/useLocalStorageData';
import { LocalStorageData } from '../types';

/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 11:nn:47
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

// Create a provider component
export const StorageProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [localStorageData, setLocalStorageData] = useState<LocalStorageData[]>(
    []
  );

  const updateLocalStorageData = (payload: LocalStorageData) => {
    const updatedData = [payload, ...localStorageData];
    setLocalStorageData(updatedData);
    localStorage.setItem('medida_canvas_data', JSON.stringify(updatedData));
  };

  const clearLocalStorageData = () => {
    setLocalStorageData([]);
    localStorage.removeItem('medida_canvas_data');
  };

  useEffect(() => {
    const storedData = localStorage.getItem('medida_canvas_data');
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    // Only set the data if it's an array
    setLocalStorageData(Array.isArray(parsedData) ? parsedData : []);
  }, []);

  return (
    <StorageContext.Provider
      value={{
        localStorageData,
        updateLocalStorageData,
        clearLocalStorageData
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
