import { UPDATE_SETTING } from "../actionTypes";

const lang = localStorage.getItem("lang");
const initialState = {
  dark: true,
  language: lang ? lang : "en-US"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTING: {
      const { content } = action.payload;
      const { language } = content;
      if (language && language.length) {
        localStorage.setItem("lang", language);
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
