import { UPDATE_PROFILE, UPDATE_SETTING } from "./actionTypes";

export const updateProfile = content => ({
  type: UPDATE_PROFILE,
  payload: {
    content
  }
});
export const updateSetting = content => ({
  type: UPDATE_SETTING,
  payload: {
    content
  }
});
