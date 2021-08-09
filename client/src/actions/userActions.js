import axios from "axios";
import { GET_EXT_USER, EXT_USER_LOADING } from "./types";
import { returnErrors } from "./errorActions";
export const getUser = (userid) => async (dispatch) => {
  dispatch(setExtUserLoading());
  let response = await axios
    .get(`/api/users/?userid=${userid}`)
    .then((res) => {
      dispatch({
        type: GET_EXT_USER,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  return response;
};
export const setExtUserLoading = () => {
  return {
    type: EXT_USER_LOADING,
  };
};
