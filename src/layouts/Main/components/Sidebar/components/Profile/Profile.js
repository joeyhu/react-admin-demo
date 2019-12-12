import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));
const Profile = props => {
  const { className, sideBarClose, profile, ...rest } = props;
  const history = useHistory();
  const classes = useStyles();
  // const controller = new AbortController();
  // const signal = controller.signal;

  useEffect(() => {}, []);
  const goSettings = () => {
    sideBarClose();
    history.push("/settings");
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={profile.avatar}
        onClick={goSettings}
      />
      <Typography className={classes.name} variant="h4">
        {profile.name}
      </Typography>
      <Typography variant="body2">{profile.email}</Typography>
      <Typography variant="body2">{profile.phone}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};
const mapStateToProps = state => {
  console.log(state);
  return state;
};
export default connect(mapStateToProps)(Profile);
