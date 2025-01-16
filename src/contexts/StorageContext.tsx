import React, { useEffect, useState } from 'react';
import { StorageContext } from '../hooks/useLocalStorageData';
import { LocalStorageData } from '../types';

/*
 * ############################################################################### *
 * Created Date: Th Jan 2025                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Th/01/2025 01:nn:32
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
  const [restoredDrawing, setRestoredDrawing] =
    useState<LocalStorageData | null>(null);

  const updateLocalStorageData = (payload: LocalStorageData) => {
    const updatedData = [payload, ...localStorageData];
    setLocalStorageData(updatedData);
    localStorage.setItem('medida_canvas_data', JSON.stringify(updatedData));
  };

  const clearLocalStorageData = () => {
    setLocalStorageData([]);
    localStorage.removeItem('medida_canvas_data');
  };

  const restoreDrawing = (drawingId: string) => {
    // find the drawing with the given ID
    const drawing = localStorageData.find((item) => item.id === drawingId);

    if (drawing) {
      setRestoredDrawing(drawing as LocalStorageData);
    }
  };

  const deleteDrawing = (drawingId: string) => {
    // filter out the drawing with the given ID
    const updatedData = localStorageData.filter(
      (item) => item.id !== drawingId
    );

    setLocalStorageData(updatedData);
    localStorage.setItem('medida_canvas_data', JSON.stringify(updatedData));
  };

  const filterList = (value: string) => {
    const sortedData = localStorageData.sort((a, b) => {
      if (value === 'distance') {
        return a.distance - b.distance;
      }

      if (value === 'createdAt') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return 0;
    });

    setLocalStorageData([...sortedData]);
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
        filterList,
        localStorageData,
        updateLocalStorageData,
        clearLocalStorageData,
        restoreDrawing,
        deleteDrawing,
        restoredDrawing
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
