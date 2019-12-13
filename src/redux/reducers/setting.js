import { UPDATE_SETTING } from "../actionTypes";

const initialState = {
  dark: true,
  language: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTING: {
      const { content } = action.payload;
      return {
        ...state,
        ...content
      };
    }
    default:
      return state;
  }
}
