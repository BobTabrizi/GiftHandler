import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  SELECT_EDIT_ITEM,
  UNSELECT_EDIT_ITEM,
  ITEMS_LOADING,
  PURCHASE_ITEM,
  FILTER_ITEM,
  SET_FILTER_ITEM,
  CLEAR_FILTER_ITEMS,
  CLEAR_ITEMS,
  SELECT_VIEW_ITEM,
} from "./types";
import { returnErrors } from "./errorActions";

export const getItems = (UserID, GroupID) => async (dispatch) => {
  dispatch(setItemsLoading());
  let response = await axios
    .get(`/api/items/user?userid=${UserID}&groupid=${GroupID}`, {})
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

export const addItem = (Item) => (dispatch) => {
  axios
    .post(`/api/items/add`, {
      Item,
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
    .delete(`/api/items/delete?itemid=${id}&itemKey=${Key}`)
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
    .post(`/api/items/edit`, {
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

export const purchaseItem = (item) => (dispatch) => {
  axios
    .post(`/api/items/purchase`, {
      item: item,
    })
    .then((res) => {
      dispatch({
        type: PURCHASE_ITEM,
        payload: {
          payload: res.data,
        },
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getItemImage = (ItemDetails) => async (dispatch) => {
  let Response = await axios
    .get(
      `/api/items/getData?Vendor=${ItemDetails.Vendor}&Link=${ItemDetails.Link}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  return Response;
};

export const filterItems = (FilterParam) => {
  return {
    type: FILTER_ITEM,
    payload: {
      FilterParam: FilterParam,
    },
  };
};

export const setFilterItem = (item) => {
  return {
    type: SET_FILTER_ITEM,
    payload: item,
  };
};

export const clearFilterItems = () => {
  return {
    type: CLEAR_FILTER_ITEMS,
    payload: null,
  };
};

export const clearItems = () => {
  return {
    type: CLEAR_ITEMS,
    payload: null,
  };
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

export const selectViewItem = (item) => (dispatch) => {
  dispatch({
    type: SELECT_VIEW_ITEM,
    payload: {
      displayViewModal: true,
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
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
