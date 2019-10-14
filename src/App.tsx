import { Button, Fab, makeStyles, Theme, Container, CssBaseline } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import StarIcon from "@material-ui/icons/Star";
import { createStyles, ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import Nav from "./components/Nav";
import { getData } from "./lib/data";
import { theme } from "./lib/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 0
    },
    page: {
      padding: theme.spacing(3)
    },
    fab: {
      position: "absolute",
      color: '#FFF',
      bottom: -1 * theme.spacing(3),
      right: theme.spacing(5)
    },
    button: {
      marginRight: theme.spacing(2)
    },
    visible: {},
    hidden: { display: "none" }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState({ items: [] });

  const { items } = data;

  const populate = () => {
    setData({ items: [] });

    getData("MoistureLevel").then(results => {
      console.log('Loaded results', results);
      setData({ items: results });
    });
  };

  useEffect(populate, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav>
        <Fab color="secondary" className={classes.fab} onClick={populate}>
          <RefreshIcon />
        </Fab>
      </Nav>
      <Container className={classes.container}>
        <Chart title="Moisture" items={items.reverse()} />
        <div className={classes.page}>
          <Button
            startIcon={<StarIcon />}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Hello
          </Button>
          <Button variant="contained">world</Button>
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default App;
