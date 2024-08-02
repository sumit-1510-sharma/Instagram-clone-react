// export const signinAction = (data) => async (dispatch) => {
//   const res = await fetch("http://localhost:5454/signin", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Basic " + btoa(data.username + ":" + data.password),
//     },
//   });
//   const token = await res.headers.get("Authorization");

import { SIGN_IN, SIGN_UP } from "./ActionType";

//   console.log("token from header :- ", token);
//   const data = await res.json();
// };

// const BASE_API_URL = "";
// const BASE_API_URL = "http://instagram-backend-env.eba-juf5vnep.ap-south-1.elasticbeanstalk.com";
const BASE_API_URL = "https://responsible-enchantment-production.up.railway.app";

export const signinAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/signin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    });
    const token = res.headers.get("Authorization");

    localStorage.setItem("token", token);
    console.log("token from header :- ", token);
    dispatch({type:SIGN_IN,payload:token})
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const signupAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    console.log("Signup :- ",user)
    dispatch({ type: SIGN_UP, payload: user });
  } catch (error) {
    console.log("catch error ", error);
  }
};
