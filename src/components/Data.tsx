import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StorageIcon from "@material-ui/icons/Storage";
import React, { useState } from "react";
import { MoistureLevel } from "../models";

interface Data {
  items: MoistureLevel[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    }
  })
);

const formatDate = (date: string) => new Date(date).toString();

const Data: React.SFC<Data> = ({ items }) => {
  const { box } = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={box}>
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="Raw data" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items.map((item: MoistureLevel) => (
              <ListItem key={item.objectId}>
                <ListItemText
                  primary={item.Sensor + " " + item.Value}
                  secondary={formatDate(item.createdAt)}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Data;
