import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  UPDATE_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PW_RESET_REQ,
  PW_RESET_REQ_FAIL,
  PW_RESET,
  PW_RESET_FAIL,
  GET_PUBLIC_USER,
  PUBLIC_USER_LOADING,
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
    .get(`/api/auth/user/${token}`)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      return res.data.id;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });

  //Return ID Directly for Group Querying
  //console.log(response);
  return response;
};

//Register user
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    axios
      .post("/api/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });

        /*  Direct to FTUE Page  */
        history.push("/welcome");
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    axios
      .post("/api/auth/login", {
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
        dispatch(
          returnErrors(
            err.response.data.error.message,
            err.response.status,
            "LOGIN_FAIL"
          )
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const updateUser = (user) => (dispatch) => {
  axios
    .post("/api/auth/update", {
      UID: user.id,
      name: user.name,
      profileImage: user.profileImage,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const passResetProcess = (pid, code, password) => async (dispatch) => {
  let Response = await axios
    .post("/api/auth/passReset", {
      pid: pid,
      code: code,
      password: password,
    })
    .then((res) => {
      dispatch({
        type: PW_RESET,
        payload: res.data,
      });
      return res;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return err.response;
    });
  return Response;
};

export const passResetRequest = (email, pid) => async (dispatch) => {
  let Response = await axios
    .post("/api/auth/resetReq", {
      email: email,
      pid: pid,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return err.response;
    });

  return Response;
};

export const getPublicUser = (userid) => async (dispatch) => {
  dispatch(setPublicUserLoading());
  let response = await axios
    .get(`/api/auth/publicUser/${userid}`)
    .then((res) => {
      dispatch({
        type: GET_PUBLIC_USER,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  return response;
};
export const setPublicUserLoading = () => {
  return {
    type: PUBLIC_USER_LOADING,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
