import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <SignOutMenuItem onClick={handleClose}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
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

export default Topbar;
