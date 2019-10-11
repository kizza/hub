import { brown, orange } from "@material-ui/core/colors";
import createMuiTheme, {
  ThemeOptions
} from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
  status: {
    danger: orange[500]
  },
  text: {
    primary: orange
  },
  typography: {
    h1: {
      fontSize: 40
    }
  },
  palette: {
    primary: brown,
    secondary: { main: "#8BC34A" },
    background: {
      default: "#FFF",
      paper: brown[300]
    }
  }
} as ThemeOptions);
