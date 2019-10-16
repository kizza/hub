import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Graph from "chart.js";
import React, { useEffect, useRef, useState, RefObject } from "react";
import { useWindowResize } from "../lib/hooks";
import { theme } from "../lib/theme";
import { MoistureLevel } from "../models";
import Data from "./Data";
import Spinner from "./Spinner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    chart: {
      paddingTop: theme.spacing(2)
    },
    chartLabel: {
      display: "block",
      padding: theme.spacing(4),
      paddingBottom: theme.spacing(1)
    },
    spinner: {
      position: "absolute",
      margin: "22% -4%",
      width: "100%",
      textAlign: "center"
    }
  })
);

const formatGraphData = (data: MoistureLevel[]) => {
  const initialState = { labels: [], data: [] } as {
    labels: string[];
    data: number[];
  };

  return data.reduce(
    (acc, each) => ({
      labels: [...acc.labels, each.createdAt],
      data: [...acc.data, each.Value]
    }),
    initialState
  );
};

interface Chart {
  title: string;
  items: MoistureLevel[];
}

const formatTooltip = (item: MoistureLevel) =>
  [`Sensor: ${item.Sensor}`, `Created: ${item.createdAt}`].join("\n\n");

const createChart = (
  ref: RefObject<HTMLCanvasElement>,
  items: MoistureLevel[]
) => {
  if (ref.current === null) {
    return;
  }

  const canvas = ref.current.getContext("2d")!;

  const { labels, data } = formatGraphData(items);

  return new Graph(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "",
          borderColor: theme.palette.secondary.main,
          fill: false,
          data: data
        }
      ]
    },
    options: {
      tooltips: {
        callbacks: {
          label: item => formatTooltip(items[item.index!])
        }
      },
      responsive: true,
      legend: { display: false },
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            time: {
              displayFormats: {
                minute: "h:mm a"
              }
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              stepSize: 20
            }
          }
        ]
      }
    }
  });
};

const Chart: React.SFC<Chart> = ({ title, items }) => {
  const chartDomRef = useRef<HTMLCanvasElement>(null);

  const classes = useStyles();

  const [state, setState] = useState({ loading: true });

  const { loading } = state;

  useEffect(() => {
    setState({ loading: items.length === 0 });

    createChart(chartDomRef, items);
  }, [chartDomRef, loading, items]);

  useWindowResize(() => {
    createChart(chartDomRef, items);
  });

  return (
    <div className={classes.container}>
      <Typography variant="button" className={classes.chartLabel}>
        {title}
      </Typography>
      {loading ? (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      ) : (
        ""
      )}
      <div className={classes.chart}>
        <canvas id="myChart" ref={chartDomRef} />
      </div>
      {items.length > 0 && <Data items={items.reverse()} />}
    </div>
  );
};

export default Chart;
