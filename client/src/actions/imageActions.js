import axios from "axios";
import { ADD_IMAGE, DELETE_IMAGE } from "./types";
import { returnErrors } from "./errorActions";

export const addImage = (formData) => async (dispatch) => {
  let response = await axios
    .post("http://localhost:3005/api/images/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      dispatch({
        type: ADD_IMAGE,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  // console.log(response);
  return response;
};

export const deleteImage = (imageKey) => async (dispatch) => {
  let response = await axios
    .delete(`http://localhost:3005/api/images/delete?imageKey=${imageKey}`)
    .then((res) => {
      dispatch({
        type: DELETE_IMAGE,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  // console.log(response);
  return response;
};
