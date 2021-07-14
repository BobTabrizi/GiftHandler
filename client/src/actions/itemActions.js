import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  ADD_IMAGE,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getItems = (id) => async (dispatch) => {
  dispatch(setItemsLoading());
  let response = await axios
    .get(`http://localhost:3005/api/items/user?userid=${id}`, {})
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  return response;
};

export const addItem = (userid, price, imageKey, itemname) => (dispatch) => {
  axios
    .post(`http://localhost:3005/api/items/add`, {
      userid: userid,
      price: price,
      imageKey: imageKey,
      name: itemname,
    })
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addImage = (formData) => async (dispatch) => {
  let response = await axios
    .post("http://localhost:3005/api/items/image", formData, {
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

export const deleteItem = (id, Key) => (dispatch) => {
  console.log(id);
  axios
    .delete(`/api/items/delete?itemid=${id}&itemKey=${Key}`)
    .then((res) => {})
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  //Place here at the moment, for some reason axios then block is being skipped
  //TODO, figure out why & put some error handling as well
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
