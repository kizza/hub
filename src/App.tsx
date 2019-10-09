import { Button, Typography, makeStyles, Theme } from "@material-ui/core";
import { ThemeProvider, createStyles } from "@material-ui/styles";
import React from "react";
import { theme, styles } from "./theme";
import Nav from './Nav';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(2)
    },
    page: {
      padding: theme.spacing(3)
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
  <ThemeProvider theme={theme}>
    <Nav />
    <div className={classes.page}>
      <Typography variant="h1" className={classes.title}>
        Welcome to the hub!
      </Typography>
      <Button className={styles(theme).button} variant="contained" color="primary">
        Hello
      </Button>
      <Button variant="contained">world</Button>
    </div>
  </ThemeProvider>
  )
}

export default App;
