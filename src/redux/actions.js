import { SIGN_IN, SIGN_OUT } from "./actionTypes";

export const signIn = content => ({
  type: SIGN_IN,
  payload: {
    content
  }
});

export const signOut = () => ({
  type: SIGN_OUT,
  payload: {}
});
