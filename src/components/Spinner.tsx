import { CircularProgress, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
    },
    label: {
      position: "relative",
      left: theme.spacing(2),
      top: -0.8 * theme.spacing(1)
    }
  })
);

const Spinner: React.SFC = () => {
  const { box, label } = useStyles();

  return (
    <div className={box}>
      <CircularProgress color="secondary" size={24} />
      <Typography variant="button" className={label}>
        Loading
      </Typography>
    </div>
  );
};

export default Spinner;
