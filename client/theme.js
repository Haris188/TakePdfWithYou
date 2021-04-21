import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#605891',
      accent: '#312B53'
    },
    secondary: {
      main: '#d75905',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      secondary: '#F8F8F8'
    },
  },
});

export default theme;