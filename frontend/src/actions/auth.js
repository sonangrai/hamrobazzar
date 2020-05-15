import Axios from "axios";
import * as type from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await Axios.get("http://127.0.0.1:4000/api/auth");

    dispatch({
      type: type.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: type.AUTH_ERROR,
    });
  }
};

//login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await Axios.post(
      "http://127.0.0.1:4000/api/auth",
      body,
      config
    );

    dispatch({
      type: type.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: type.LOGIN_FAIL,
    });
  }
};
