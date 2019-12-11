import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";

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
  const { className, sideBarClose, ...rest } = props;
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "Joey Hu",
    avatar: "/images/avatars/avatar_11.png",
    desc: "Developer"
  });
  // const controller = new AbortController();
  // const signal = controller.signal;

  useEffect(() => {
    // axios
    //   .get("/api/account/User/profile")
    //   .then(({ data }) => {
    //     setUser(data);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }, []);
  const goSettings = () => {
    sideBarClose();
    history.push("/settings");
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={user.avatar}
        onClick={goSettings}
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.desc}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
