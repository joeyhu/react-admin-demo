import { UPDATE_PROFILE } from "../actionTypes";

const initialState = {
  name: "",
  icon: "",
  address: "",
  email: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE: {
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
