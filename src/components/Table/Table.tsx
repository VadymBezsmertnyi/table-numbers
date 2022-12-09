import { getNearestNumber } from 'hooks/customFunction';
import Context from 'provider/provider';
import { useContext, useEffect, useState } from 'react';
import { Cell } from 'types/data';
import { classes } from './Table.styles';

const COLOR_CELL_HIGHLIGHT = '#33ff0085';

const Table = () => {
  const { matrix, sizeTable, addOneCell, valueX } = useContext(Context);
  const [hoverCell, setHoverCell] = useState(0);
  const [sumValuesState, setSumValuesState] = useState<{
    [key: number]: number;
  }>({});
  const [averageValuesState, setAverageValuesState] = useState<{
    [key: number]: number;
  }>({});
  const [searchNumber, setSearchNumber] = useState(0);
  const array = matrix.flat();
  const cellsHighlight = getNearestNumber(array, searchNumber, valueX);

  const addSumAverageValues = () => {
    matrix.forEach((row, indexRow) => {
      let sumValues = 0;
      row.forEach((cell, indexCell) => {
        sumValues += cell.amount;
      });
      setSumValuesState((state) => ({
        ...state,
        [indexRow]: sumValues,
      }));
    });
    matrix[0]?.map((_item, indexCell) => {
      let sumValues = 0;
      matrix.forEach((item) => {
        sumValues += item[indexCell].amount;
      });

      setAverageValuesState((state) => ({
        ...state,
        [indexCell]: sumValues / sizeTable.m,
      }));
    });
  };

  const showPercent = (value: number, indexRow: number) => {
    const valuePercent = (value * 100) / sumValuesState[indexRow];
    return Math.round(valuePercent);
  };

  useEffect(() => {
    addSumAverageValues();
  }, [matrix]);

  return (
    <div style={classes.table}>
      {matrix.length && matrix[0]?.length ? (
        <table cellSpacing={0} cellPadding={1} border={1}>
          <thead>
            <tr>
              <th style={classes.column} />
              {matrix[0]?.map((_item, indexColumn) => (
                <th key={`header_${indexColumn}`} style={classes.column}>
                  Cell values N = {indexColumn + 1}
                </th>
              ))}
              <th style={classes.column}>Sum values</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, indexRow) => (
              <tr key={`row_${indexRow}`}>
                <td style={classes.column}>Cell Value M = {indexRow + 1}</td>
                {row.map((cell, indexCell) => {
                  const cellHighlight =
                    cellsHighlight.findIndex(
                      (cellHighlight) => cellHighlight.id === cell.id
                    ) >= 0 && searchNumber !== 0;
                  const colorBackground = cellHighlight
                    ? COLOR_CELL_HIGHLIGHT
                    : hoverCell === indexRow + 1
                    ? `linear-gradient(90deg, rgba(57,222,0,1) ${
                        showPercent(cell.amount, indexRow) - 10
                      }%, rgba(255,255,255,1) ${
                        showPercent(cell.amount, indexRow) + 10
                      }%)`
                    : 'white';

                  return (
                    <td
                      key={`cell_${indexCell}`}
                      onMouseMove={() => setSearchNumber(-cell.amount)}
                      onMouseOut={() => setSearchNumber(0)}
                      onClick={() =>
                        addOneCell(indexRow, indexCell, cell.amount + 1)
                      }
                      style={{
                        ...classes.column,
                        background: colorBackground,
                      }}
                    >
                      {hoverCell === indexRow + 1
                        ? `${showPercent(cell.amount, indexRow)}%`
                        : cell.amount}
                    </td>
                  );
                })}
                <td
                  onMouseMove={() => setHoverCell(indexRow + 1)}
                  onMouseOut={() => setHoverCell(0)}
                  style={classes.column}
                >
                  {sumValuesState[indexRow]}
                </td>
              </tr>
            ))}
            <tr>
              <td style={classes.column}>Average values</td>
              {matrix[0]?.map((_item, indexCell) => (
                <td key={`average_${indexCell}`} style={classes.column}>
                  {averageValuesState[indexCell]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : (
        <h2>Please enter values</h2>
      )}
    </div>
  );
};

export default Table;
