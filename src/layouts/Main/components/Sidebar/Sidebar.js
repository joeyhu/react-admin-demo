import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ChatIcon from "@material-ui/icons/Chat";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import intl from "react-intl-universal";

import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)"
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: intl.get("sidebar_dashboard"),
      href: "/dashboard",
      icon: <DashboardIcon />
    },
    {
      title: intl.get("sidebar_todo"),
      href: "/todo",
      icon: <AssignmentTurnedInIcon />
    },
    {
      title: intl.get("sidebar_chat"),
      href: "/chat",
      icon: <ChatIcon />
    },
    {
      title: intl.get("sidebar_users"),
      href: "/users",
      icon: <PeopleIcon />
    },
    {
      title: intl.get("sidebar_account"),
      href: "/account",
      icon: <AccountBoxIcon />
    },
    {
      title: intl.get("sidebar_settings"),
      href: "/settings",
      icon: <SettingsIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile sideBarClose={onClose} />
        <Divider className={classes.divider} />
        <SidebarNav
          sideBarClose={onClose}
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
