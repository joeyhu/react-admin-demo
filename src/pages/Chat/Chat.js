import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

const Chat = () => {
  const classes = useStyles();

  return <div className={classes.root}>x</div>;
};

export default Chat;
