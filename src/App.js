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

import cTheme from "./theme";
import Routes from "./routes/index";

import enUS from "./locales/en-US.js";
import zhCN from "./locales/zh-CN.js";

// locale data
const locales = {
  "en-US": enUS,
  "zh-CN": zhCN
};

export const history = createBrowserHistory();

function App(props) {
  const { updateProfile, setting } = props;
  let [initDone, setInitDone] = useState(false);

  const { dark } = setting;
  console.log(dark);
  cTheme.palette.type = dark ? "dark" : "light";
  let [theme, setTheme] = useState(cTheme);

  intl
    .init({
      currentLocale: "en-US", // TODO: determine locale here
      locales
    })
    .then(() => {
      // After loading CLDR locale data, start to render
    });

  useEffect(() => {
    theme.palette.type = dark ? "dark" : "light";
    setTheme(theme);

    const token = sessionStorage.getItem("token");
    if (token && token.length) {
      reqApi
        .get("/User/profile")
        .then(function(response) {
          updateProfile(response.data);
          setInitDone(true);
        })
        .catch(e => {
          setInitDone(true);
        });
    } else {
      setInitDone(true);
    }
  }, [dark, theme, updateProfile]);
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
}
export default connect(state => state, { updateProfile })(App);
