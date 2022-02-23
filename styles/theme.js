import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#04d68f',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: "#E05269",
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      '"Comfortaa"',
      'cursive',
    ].join(','),
    fontSize: 12,
    fontWeight:400,
  }
});

export default theme;