import enUS from "./en-US.js";
import zhCN from "./zh-CN.js";
import zhTW from "./zh-TW.js";
import frFR from "./fr-FR.js";
import jaJP from "./ja-JP.js";

// locale data
export const locales = {
  "en-US": enUS,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  "fr-FR": frFR,
  "ja-JP": jaJP
};
export const SUPPOER_LOCALES = [
  {
    name: "English",
    value: "en-US"
  },
  {
    name: "简体中文",
    value: "zh-CN"
  },
  {
    name: "繁體中文",
    value: "zh-TW"
  },
  {
    name: "français",
    value: "fr-FR"
  },
  {
    name: "日本の",
    value: "ja-JP"
  }
];

export const SUPPOER_LOCALES_MAP = SUPPOER_LOCALES.reduce((re, item) => {
  re[item.value] = item;
  return re;
}, {});
