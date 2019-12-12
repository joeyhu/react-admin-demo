import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { AccountProfile, AccountDetails, Password } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  hr: {
    padding: theme.spacing(1)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile />
          <div className={classes.hr}></div>
          <Password />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
