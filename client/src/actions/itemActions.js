import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  SELECT_EDIT_ITEM,
  UNSELECT_EDIT_ITEM,
  SELECT_ADD_ITEM,
  UNSELECT_ADD_ITEM,
  ITEMS_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getItems = (UserID, GroupID) => async (dispatch) => {
  dispatch(setItemsLoading());
  let response = await axios
    .get(
      `http://localhost:3005/api/items/user?userid=${UserID}&groupid=${GroupID}`,
      {}
    )
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

export const addItem =
  (userid, price, imageKey, itemname, GroupID) => (dispatch) => {
    axios
      .post(`http://localhost:3005/api/items/add`, {
        userid: userid,
        price: price,
        imageKey: imageKey,
        name: itemname,
        groupID: GroupID,
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

export const deleteItem = (id, Key) => (dispatch) => {
  axios
    .delete(
      `http://localhost:3005/api/items/delete?itemid=${id}&itemKey=${Key}`
    )
    .then((res) => {})
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  //Place here at the moment, for some reason axios then block is being skipped
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
};

export const editItem = (item) => (dispatch) => {
  axios
    .post(`http://localhost:3005/api/items/edit`, {
      item: item,
    })
    .then((res) => {
      dispatch({
        type: EDIT_ITEM,
        payload: {
          payload: res.data,
        },
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const selectEditItem = (item) => (dispatch) => {
  dispatch({
    type: SELECT_EDIT_ITEM,
    payload: {
      displayEditModal: true,
      itemDetails: item,
    },
  });
};

export const unSelectEditItem = () => (dispatch) => {
  dispatch({
    type: UNSELECT_EDIT_ITEM,
    payload: {
      displayEditModal: false,
      itemDetails: null,
    },
  });
};

export const selectAddItem = () => (dispatch) => {
  dispatch({
    type: SELECT_ADD_ITEM,
    payload: {
      displayAddModal: true,
    },
  });
};

export const unSelectAddItem = () => (dispatch) => {
  dispatch({
    type: UNSELECT_ADD_ITEM,
    payload: {
      displayAddModal: false,
    },
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
