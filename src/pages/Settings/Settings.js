import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { Language, Theme } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Language />
        </Grid>
        <Grid item md={6} xs={12}>
          <Theme />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
