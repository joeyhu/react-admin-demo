import { UPDATE_SETTING } from "../actionTypes";

const lang = localStorage.getItem("lang");
const dark = localStorage.getItem("dark");
const initialState = {
  dark: dark === "1",
  language: lang ? lang : "en-US"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTING: {
      const { content } = action.payload;
      const { language, dark } = content;
      if (language && language.length) {
        localStorage.setItem("lang", language);
      }
      if (dark !== null && dark !== undefined) {
        localStorage.setItem("dark", dark ? "1" : "0");
      }
      return {
        ...state,
        ...content
      };
    }
    default:
      return state;
  }
}
