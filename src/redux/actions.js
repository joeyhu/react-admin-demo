import { SIGN_IN, SIGN_OUT, UPDATE_PROFILE } from "./actionTypes";

export const signIn = ({ email, password }) => {
  return dispatch => {
    fetch("/api/User/SignIn", {
      method: "POST",
      body: { email, password } //自动将input:file的name属性与文件对象组合成键值对
    })
      .then(res => res.json())
      .then(content => {
        dispatch({
          type: SIGN_IN,
          payload: {
            content
          }
        });
      });
  };
};

// export const signIn = () => ({
//   type: SIGN_IN,
//   payload: {}
// });

export const signOut = () => ({
  type: SIGN_OUT,
  payload: {}
});

export const updateProfile = content => ({
  type: UPDATE_PROFILE,
  payload: {
    content
  }
});
