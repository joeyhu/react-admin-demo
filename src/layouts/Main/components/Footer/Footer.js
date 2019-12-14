import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Box } from "@material-ui/core";
import intl from "react-intl-universal";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    marginLeft: theme.spacing(1)
  },
  link: {
    color: theme.palette.textSecondary
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Box {...rest} className={clsx(classes.root, className)}>
      <a
        href="https://github.com/joeyhu/react-admin-demo"
        className={classes.link}
      >
        <GitHubIcon color="textSecondary" fontSize="small" />
      </a>
      <Typography
        className={classes.name}
        variant="body1"
        style={{ textAlign: "center" }}
      >
        &copy; 2019 {intl.get("company")}
      </Typography>
    </Box>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
