/**
 *
 * @Component imageActions.js
 * @Description Action functions for image manipulation.
 *
 */

import axios from "axios";
import { ADD_IMAGE, DELETE_IMAGE } from "./types";
import { returnErrors } from "./errorActions";

export const addImage = (formData) => async (dispatch) => {
  let response = await axios
    .post("/api/images/add", formData, {
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
  return response;
};

export const deleteImage = (imageKey) => async (dispatch) => {
  let response = await axios
    .delete(`/api/images/delete?imageKey=${imageKey}`)
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
  return response;
};
