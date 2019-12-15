import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import intl from "react-intl-universal";
import {
  AppBar,
  Toolbar,
  Badge,
  Typography,
  IconButton,
  Button,
  Hidden
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import TranslateIcon from "@material-ui/icons/Translate";
import GitHubIcon from "@material-ui/icons/GitHub";

import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
// import InputIcon from "@material-ui/icons/Input";

import { connect } from "react-redux";
import { updateProfile, updateSetting } from "../../../../redux/actions";
import { SUPPOER_LOCALES, SUPPOER_LOCALES_MAP } from "../../../../locales";

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
      color: theme.palette.secondary
    }
  }
}))(MenuItem);

const Topbar = props => {
  const {
    className,
    history,
    profile,
    setting,
    updateProfile,
    updateSetting,
    onSidebarOpen,
    ...rest
  } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [langEl, setLangEl] = React.useState(null);

  const { dark, language } = setting;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const changeLanguage = event => {
    setLangEl(event.currentTarget);
  };
  const selectLanguage = lang => {
    console.log(lang);
    handleClose();
    updateSetting({ language: lang });
  };
  const handleClose = () => {
    setAnchorEl(null);
    setLangEl(null);
  };
  const changeDark = () => {
    handleClose();
    updateSetting({ ...setting, dark: !dark });
  };
  const signOut = () => {
    handleClose();
    sessionStorage.removeItem("token");
    updateProfile({ _id: "", name: "", email: "", phone: "" });
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        {profile !== undefined &&
          profile._id !== undefined &&
          profile._id.length > 0 && (
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          )}
        <Typography variant="h5" color="inherit" component={RouterLink} to="/">
          {intl.get("app_name")}
        </Typography>
        <div className={classes.flexGrow} />

        <Button
          color="inherit"
          startIcon={<TranslateIcon />}
          onClick={changeLanguage}
        >
          <Hidden mdDown> {SUPPOER_LOCALES_MAP[language].name}</Hidden>
        </Button>
        <Menu
          id="language-menu"
          anchorEl={langEl}
          keepMounted
          open={Boolean(langEl)}
          onClose={handleClose}
        >
          {SUPPOER_LOCALES.map(v => (
            <MenuItem
              onClick={() => {
                selectLanguage(v.value);
              }}
            >
              <ListItemIcon>
                <TranslateIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={v.name} />
            </MenuItem>
          ))}
        </Menu>

        <IconButton color={dark ? "secondary" : "inherit"} onClick={changeDark}>
          <WbIncandescentIcon />
        </IconButton>
        {profile !== undefined &&
          profile._id !== undefined &&
          profile._id.length > 0 && (
            <IconButton color="inherit" onClick={handleClick}>
              <Badge
                className={classes.margin}
                badgeContent={10}
                color="secondary"
              >
                <AppsIcon />
              </Badge>
            </IconButton>
          )}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            component="a"
            href="https://github.com/joeyhu/react-admin-demo"
            target="_blank"
            onClick={handleClose}
          >
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={intl.get("source_code")} />
          </MenuItem>
          <MenuItem component={RouterLink} to="/account" onClick={handleClose}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={intl.get("sidebar_account")} />
          </MenuItem>
          <MenuItem component={RouterLink} to="/settings" onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={intl.get("sidebar_settings")} />
          </MenuItem>
          <SignOutMenuItem
            component={RouterLink}
            to="/sign-in"
            onClick={signOut}
          >
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={intl.get("sign_out")} />
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

export default connect(state => state, { updateProfile, updateSetting })(
  Topbar
);
