import {
  Container,
  CssBaseline,
  Fab,
  makeStyles,
  Theme
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { createStyles, ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import Nav from "./components/Nav";
import Timeframe from "./components/Timeframe";
import { getData } from "./lib/data";
import { theme } from "./lib/theme";
import { MoistureLevel, TimeframeOption } from "./models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 0
    },
    fab: {
      position: "absolute",
      color: "#FFF",
      bottom: -1 * theme.spacing(3),
      right: theme.spacing(5)
    },
    button: {
      marginRight: theme.spacing(2)
    },
    footer: {
      textAlign: 'center',
      color: '#ccc'
    }
  })
);

type App = {
  items: MoistureLevel[];
  timeframe: TimeframeOption;
};

const App: React.FC = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    timeframe: TimeframeOption.Last24Hours,
    items: []
  });

  const { items, timeframe } = data;

  const populate = () => {
    setData({ timeframe, items: [] });

    getData("MoistureLevel", timeframe).then(results => {
      console.log("Loaded results", results);
      setData({ timeframe, items: results });
    });
  };

  useEffect(populate, [timeframe]);

  const handleTimeframeChange = (timeframe: TimeframeOption) =>
    setData({ ...data, timeframe });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav>
        <Fab color="primary" className={classes.fab} onClick={populate}>
          <RefreshIcon />
        </Fab>
      </Nav>
      <Container className={classes.container}>
        <Timeframe
          label="Timeframe"
          timeframe={timeframe}
          handleChange={handleTimeframeChange}
        />
        <Chart title="Moisture" items={items.reverse()} />
      </Container>
      <p className={classes.footer}>v0.4</p>
    </ThemeProvider>
  );
};
export default App;
