import { FormControl, InputLabel, Select, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { TimeframeOption } from "../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#eee",
      padding: theme.spacing(4)
    },
    field: {
      width: "100%"
    }
  })
);

type TimeframeKey = keyof typeof TimeframeOption

interface TimeframeState {
  label: string;
  timeframe: TimeframeOption;
  handleChange: (timeframe: TimeframeOption) => void;
}

const Timeframe: React.FC<TimeframeState> = props => {
  const { label, timeframe, handleChange } = props;

  const classes = useStyles();

  const options = Object.keys(
    TimeframeOption
  ) as TimeframeKey[]

  const onChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    handleChange(event.target.value as TimeframeOption)

  return (
    <div className={classes.root}>
      <FormControl className={classes.field}>
        <InputLabel htmlFor="timeframe">{label}</InputLabel>
        <Select
          native
          value={timeframe}
          onChange={onChange}
          inputProps={{
            name: "timezone",
            id: "timeframe"
          }}
        >
          {options.map((each: TimeframeKey) => (
            <option key={each} value={TimeframeOption[each]}>
              {TimeframeOption[each]}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Timeframe;
