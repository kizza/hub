import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { MoistureLevel } from "../models";

interface Data {
  items: MoistureLevel[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
);

const formatDate = (date: string) => new Date(date).toString();

const Data: React.SFC<Data> = ({ items }) => {
  const { box } = useStyles();

  return (
    <div className={box}>
      <ul>
        {items.map((item: MoistureLevel) => (
          <li key={item.objectId}>
            {item.Sensor} {item.Value} {formatDate(item.createdAt)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
