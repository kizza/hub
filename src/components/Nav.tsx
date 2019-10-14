import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    header: {
      padding: theme.spacing(4),
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(7),
      position: 'relative',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(4)
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      fontWeight: 300
    },
    subtitle: {
      flexGrow: 1,
      fontWeight: 300
    }
  })
);

type Nav = {
}

const Nav: React.FC<Nav> = ({ children }) => {
  const classes = useStyles();

  // <IconButton
  //   edge="start"
  //   className={classes.menuButton}
  //   color="inherit"
  //   aria-label="menu"
  // >
  //   <MenuIcon />
  // </IconButton>

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            Sensor Hub
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            How's the moisture level going?
          </Typography>
          {children}
      </AppBar>
    </div>
  );
};

export default Nav;
