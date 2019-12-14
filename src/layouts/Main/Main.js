import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Box, useMediaQuery } from "@material-ui/core";

import { Sidebar, Topbar, Footer } from "./components";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 50,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50
    }
  },
  shiftContent: {
    paddingLeft: 220
  },
  content: {
    height: "100%"
  }
}));

const Main = props => {
  const { children, profile } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <Box
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: profile && profile._id && isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      {profile !== undefined &&
        profile._id !== undefined &&
        profile._id.length > 0 && (
          <Sidebar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? "persistent" : "temporary"}
          />
        )}
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default connect(state => state)(Main);
