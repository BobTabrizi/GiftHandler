import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";
import { history } from "../helpers/history";
//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  //Get token from storage

  let token = "";

  if (getState().auth.token) {
    token = getState().auth.token;
  }

  let response = await axios
    .get(`http://localhost:3005/api/auth/user?token=${token}`)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      return res.data.id;
    })
    .catch((err) => {
      console.log({ err });
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });

  //Return ID Directly for Group Querying
  return response;
};

//Register user
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    axios
      .post("http://localhost:3005/api/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        console.log("hello");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("hi");
        /*
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        */
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    axios
      .post("http://localhost:3005/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        history.push("/");
      })
      .catch((err) => {
        // console.log(err);
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
