import { SIGN_IN, SIGN_OUT } from "../actionTypes";

const initialState = {
  token: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      const { content } = action.payload;
      return {
        // ...state,
        token: content.token
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        token: ""
      };
    }
    default:
      return state;
  }
}
