import { Cell } from 'types/data';

export const getNearestNumber = (
  arr: Array<Cell>,
  number: number,
  valueX: number
) =>
  arr
    .map((it) => {
      const ch = (it.amount >= 0 ? it.amount : -it.amount) + number;
      return {
        ...it,
        result: ch >= 0 ? ch : -ch,
      };
    })
    .sort((a, b) => a.result - b.result)
    .slice(1, valueX + 1);
