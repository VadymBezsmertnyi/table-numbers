import { classes } from './Footer.styles';

const Header = () => {
  return (
    <footer style={classes.footer}>
      <h3>Instructions for using the table</h3>
      <div style={classes.boxTitles}>
        <h4 style={classes.title}>Change size table(M*N):</h4>
        <p style={classes.textInfo}>use inputs in the site header</p>
      </div>
      <div style={classes.boxTitles}>
        <h4 style={classes.title}>Change size hover cells(X):</h4>
        <p style={classes.textInfo}>use input name (X) in header site</p>
      </div>
      <div style={classes.boxTitles}>
        <h4 style={classes.title}>Show percent cells in row:</h4>
        <p style={classes.textInfo}>hover mouse on the sum cell in this row</p>
      </div>
      <div style={classes.boxTitles}>
        <h4 style={classes.title}>Show "Delete" row button:</h4>
        <p style={classes.textInfo}>hover mouse on the title of the row</p>
      </div>
      <div style={classes.boxTitles}>
        <h4 style={classes.title}>Show "Add new row" button:</h4>
        <p style={classes.textInfo}>
          hover mouse on the "Average values" title
        </p>
      </div>
    </footer>
  );
};

export default Header;
