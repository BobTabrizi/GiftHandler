import axios from "axios";
import {
  GET_GROUPS,
  ADD_GROUP,
  DELETE_GROUP,
  GROUPS_LOADING,
  ADD_GROUP_MEMBER,
} from "./types";
import { returnErrors } from "./errorActions";

export const getGroups = () => (dispatch) => {
  dispatch(setGroupsLoading());
  axios
    .get("/api/groups")
    .then((res) =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addGroup =
  (groupName, passcode, adminID) => (dispatch, getState) => {
    axios
      .post("/api/groups", {
        group: groupName,
        passcode: passcode,
        user: adminID,
      })
      .then((res) =>
        dispatch({
          type: ADD_GROUP,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

export const addGroupMember =
  (groupName, passcode, memberID) => (dispatch, getState) => {
    axios
      .post("/api/groups/users", {
        group: groupName,
        passcode: passcode,
        user: memberID,
      })
      .then((res) =>
        dispatch({
          type: ADD_GROUP_MEMBER,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

export const deleteGroup = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/groups/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_GROUP,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setGroupsLoading = () => {
  return {
    type: GROUPS_LOADING,
  };
};
