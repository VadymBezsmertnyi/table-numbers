import React, { ReactNode, useEffect } from 'react';

import { DEFAULT_VALUE_CONTEXT } from 'constants/default';
import { Cell, TSizeTable } from 'types/data';

const { createContext, useState } = React;
const Context = createContext(DEFAULT_VALUE_CONTEXT);

interface IContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: IContextProviderProps) => {
  const [sizeTable, setSizeTable] = useState<TSizeTable>({ m: 0, n: 0 });
  const [valueX, setValueX] = useState<number>(0);
  const [showMatrix, setShowMatrix] = useState<Array<Array<Cell>>>([]);
  const [idCell, setIdCell] = useState(1);

  const createEmptyArrays = () => {
    const rows = Array.from(Array(sizeTable.m).keys());
    const columns = Array.from(Array(sizeTable.n).keys());
    return { rows, columns };
  };

  const addOneCell = (
    indexRow: number,
    indexCell: number,
    newAmount: number
  ) => {
    const newMatrix = showMatrix.map((row, indexRowState) =>
      indexRow === indexRowState
        ? row.map((cell, indexCellState) =>
            indexCell === indexCellState ? { ...cell, amount: newAmount } : cell
          )
        : row
    );
    setShowMatrix(newMatrix);
  };

  const deleteRow = (rowIdState: number) => {
    setShowMatrix((state) =>
      state.filter((_item, rowId) => rowId !== rowIdState)
    );
    setSizeTable((state) => ({ ...state, m: state.m - 1 }));
  };

  const addNewRow = () => {
    const { columns } = createEmptyArrays();
    const newRow = columns.map((_column, indexColumn) => {
      const randomNumberCell = Math.floor(Math.random() * 1000);
      return {
        id: indexColumn + 1 + idCell * 10 + randomNumberCell,
        amount: randomNumberCell,
      };
    });
    setIdCell((state) => state + 1);
    setShowMatrix((state) => [...state, newRow]);
    setSizeTable((state) => ({ ...state, m: state.m + 1 }));
  };

  const createMatrix = () => {
    const { rows, columns } = createEmptyArrays();
    const matrixState: Array<Array<Cell>> = rows.map(() => {
      setIdCell((state) => state + 1);
      return columns.map((_column, indexColumn) => {
        const randomNumberCell = Math.floor(Math.random() * 1000);
        return {
          id: indexColumn + 1 + idCell * 10 + randomNumberCell,
          amount: randomNumberCell,
        };
      });
    });
    setShowMatrix(matrixState);
  };

  useEffect(() => {
    if (
      sizeTable.m !== showMatrix?.length ||
      sizeTable.n !== showMatrix[0]?.length ||
      showMatrix?.length === 0
    )
      createMatrix();
    setIdCell((state) => state + 1);
  }, [sizeTable]);

  return (
    <Context.Provider
      value={{
        sizeTable,
        setSizeTable,
        valueX,
        setValueX,
        matrix: showMatrix,
        addOneCell,
        deleteRow,
        addNewRow,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { ContextProvider };
