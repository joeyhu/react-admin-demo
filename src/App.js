import React, { useState } from "react";
import { Router } from "react-router-dom";
import intl from "react-intl-universal";
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";

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

const browserHistory = createBrowserHistory();

export default function App() {
  let [initDone, setInitDone] = useState(false);
  intl
    .init({
      currentLocale: "en-US", // TODO: determine locale here
      locales
    })
    .then(() => {
      // After loading CLDR locale data, start to render
      setInitDone(true);
    });

  return (
    initDone && (
      <ThemeProvider theme={theme}>
        <div>{intl.get("app_name")}</div>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    )
  );
}
