import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import intl from "react-intl-universal";
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import { reqApi } from "./api";
import { connect } from "react-redux";
import { updateProfile } from "./redux/actions";

import "./assets/scss/index.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import theme from "./theme";
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
  const { updateProfile } = props;
  let [initDone, setInitDone] = useState(false);
  intl
    .init({
      currentLocale: "en-US", // TODO: determine locale here
      locales
    })
    .then(() => {
      // After loading CLDR locale data, start to render
    });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && token.length) {
      reqApi.get("/User/profile").then(function(response) {
        updateProfile(response.data);
        setInitDone(true);
      });
    } else {
      setInitDone(true);
    }
  }, [props, updateProfile]);

  return (
    initDone && (
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    )
  );
}
export default connect(null, { updateProfile })(App);
