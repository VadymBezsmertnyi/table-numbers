import Context from 'provider/provider';
import { useContext, useState } from 'react';
import { classes } from './Header.styles';

const Header = () => {
  const { sizeTable, setSizeTable, valueX, setValueX } = useContext(Context);
  const rangeX = sizeTable.m * sizeTable.n * 0.1;
  const verifyRangeX = rangeX > 1 ? Math.round(rangeX) : 1;

  const verifyNumber = (numberState: number, maxNumber: number) =>
    numberState > maxNumber ? maxNumber : numberState;

  return (
    <header style={classes.header as React.CSSProperties}>
      <div>
        <div style={classes.boxInput}>
          <p style={classes.label}>M:</p>
          <input
            type={'number'}
            max={100}
            min={0}
            placeholder={'M'}
            value={sizeTable.m}
            onChange={({ target: { value } }) =>
              setSizeTable({
                ...sizeTable,
                m: verifyNumber(Number(value), 100),
              })
            }
          />
        </div>
        <p style={classes.infoText as React.CSSProperties}>
          Range from 0 to 100
        </p>
      </div>
      <div>
        <div style={classes.boxInput}>
          <p style={classes.label}>N:</p>
          <input
            type={'number'}
            max={100}
            min={0}
            placeholder={'N'}
            value={sizeTable.n}
            onChange={({ target: { value } }) =>
              setSizeTable({
                ...sizeTable,
                n: verifyNumber(Number(value), 100),
              })
            }
          />
        </div>
        <p style={classes.infoText as React.CSSProperties}>
          Range from 0 to 100
        </p>
      </div>
      <div>
        <div style={classes.boxInput}>
          <p style={classes.label}>X:</p>
          <input
            type={'number'}
            max={verifyRangeX}
            min={0}
            placeholder={'X'}
            value={valueX}
            onChange={({ target: { value } }) =>
              setValueX(verifyNumber(Number(value), verifyRangeX))
            }
          />
        </div>
        <p style={classes.infoText as React.CSSProperties}>
          Range from 0 to {verifyRangeX}
        </p>
      </div>
    </header>
  );
};

export default Header;
