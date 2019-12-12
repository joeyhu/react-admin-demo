import React from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Badge,
  Typography,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
// import InputIcon from "@material-ui/icons/Input";

import { connect } from "react-redux";
import { updateProfile } from "../../../../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutColor: {
    color: theme.palette.secondary.main
  }
}));
const SignOutMenuItem = withStyles(theme => ({
  root: {
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: theme.palette.secondary.dark
    }
  }
}))(MenuItem);

const Topbar = props => {
  const { className, history, updateProfile, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    handleClose();
    sessionStorage.removeItem("token");
    updateProfile({});
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <IconButton color="inherit" onClick={onSidebarOpen}>
          <MenuIcon />
        </IconButton>
        <Typography color="inherit" component={RouterLink} to="/">
          快易帮™ 后台管理
        </Typography>
        <div className={classes.flexGrow} />
        <IconButton color="inherit" onClick={handleClick}>
          <Badge className={classes.margin} badgeContent={10} color="secondary">
            <AppsIcon />
          </Badge>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={RouterLink} to="/account" onClick={handleClose}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem component={RouterLink} to="/settings" onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <SignOutMenuItem
            component={RouterLink}
            to="/sign-in"
            onClick={signOut}
          >
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="SignOut" />
          </SignOutMenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default connect(null, { updateProfile })(Topbar);
