import { UPDATE_PROFILE } from "./actionTypes";

export const updateProfile = content => ({
  type: UPDATE_PROFILE,
  payload: {
    content
  }
});
