import { brown, orange } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import createMuiTheme, {
  ThemeOptions
} from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
  status: {
    danger: orange[500]
  },
  typography: {
    h1: {
      fontSize: 40
    }
  },
  palette: {
    primary: brown,
    seconary: brown[500]
  }
} as ThemeOptions);

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(2)
    },
    input: {
      display: "none"
    }
  })
);
