import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import intl from "react-intl-universal";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: "center"
  },
  button: {
    margin: theme.spacing(5),
    padding: theme.spacing(2)
  }
}));

const NotFound = props => {
  const classes = useStyles();
  const { history } = props;
  const handleBack = () => {
    history.goBack();
  };
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <Box className={classes.content}>
            <Typography variant="h1">
              404: {intl.get("page_not_found")}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleBack}
              className={classes.button}
              startIcon={<ArrowBackIcon />}
            >
              {intl.get("go_back")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
