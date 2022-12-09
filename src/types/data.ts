type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

export type Cell = {
  id: CellId;
  amount: CellValue;
};

export type TSizeTable = {
  m: number;
  n: number;
};

export interface IDefaultValuesContext {
  sizeTable: TSizeTable;
  setSizeTable: ({ m, n }: TSizeTable) => void;
  valueX: number;
  setValueX: (valueX: number) => void;
  matrix: Array<Array<Cell>>;
  addOneCell: (indexRow: number, indexCell: number, newAmount: number) => void;
  deleteRow: (cellId: number) => void;
}
