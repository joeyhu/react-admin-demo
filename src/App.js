import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import intl from "react-intl-universal";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import { reqApi } from "./api";
import { connect } from "react-redux";
import { updateProfile } from "./redux/actions";
import { CssBaseline } from "@material-ui/core";
import "./assets/scss/index.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import _ from "lodash";

import cTheme from "./theme";
import { SUPPOER_LOCALES, locales } from "./locales";
import Routes from "./routes/index";

export const history = createBrowserHistory();

const App = props => {
  const { updateProfile, setting } = props;
  let [initDone, setInitDone] = useState(false);

  const { dark, language } = setting;
  console.log(dark);
  cTheme.palette.type = dark ? "dark" : "light";
  let [theme, setTheme] = useState(cTheme);

  useEffect(() => {
    const f = async () => {
      theme.palette.type = dark ? "dark" : "light";
      setTheme(theme);

      let currentLocale = language;
      if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
        currentLocale = "en-US";
      }

      await intl.init({
        currentLocale, // TODO: determine locale here
        locales
        // locales: { [currentLocale]: require(`./locales/${currentLocale}.js`) }
      });
      const token = sessionStorage.getItem("token");
      if (token && token.length) {
        const response = await reqApi.get("/User/profile");
        updateProfile(response.data);
      }
      setInitDone(true);
    };
    f();
  }, [dark, language, theme, updateProfile]);

  const muiTheme = createMuiTheme(theme);
  return (
    initDone && (
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router history={history}>
          <Routes />
        </Router>
      </MuiThemeProvider>
    )
  );
};
export default connect(state => state, { updateProfile })(App);
