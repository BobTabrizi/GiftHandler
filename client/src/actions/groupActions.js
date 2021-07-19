import axios from "axios";
import {
  GET_USERS_GROUPS,
  GET_GROUP,
  GROUP_LOADING,
  ADD_GROUP,
  SET_ACTIVE_GROUP,
  REMOVE_GROUP_MEMBER,
  LEAVE_GROUP,
  SELECT_EDIT_GROUP,
  UNSELECT_EDIT_GROUP,
  DELETE_GROUP,
  USER_GROUPS_LOADING,
  ADD_GROUP_MEMBER,
  GET_GROUP_MEMBERS,
  GROUP_MEMBERS_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getGroups = (id) => (dispatch) => {
  dispatch(setGroupsLoading());
  axios
    .get(`http://localhost:3005/api/groups/user?userid=${id}`, {})
    .then((res) =>
      dispatch({
        type: GET_USERS_GROUPS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getGroup = (groupid) => async (dispatch) => {
  dispatch(setGroupLoading());
  let response = await axios
    .get(`http://localhost:3005/api/groups?groupid=${groupid}`)
    .then((res) => {
      dispatch({
        type: GET_GROUP,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  return response;
};

export const getGroupMembers = (groupid) => async (dispatch) => {
  dispatch(setGroupMembersLoading());
  let response = await axios
    .get(`http://localhost:3005/api/groups/members?groupid=${groupid}`, {})
    .then((res) => {
      dispatch({
        type: GET_GROUP_MEMBERS,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  //console.log(response);
  return response;
};

export const addGroup = (GroupDetails) => (dispatch) => {
  axios
    .post("http://localhost:3005/api/groups/create", {
      GroupDetails,
    })
    .then((res) => {
      dispatch({
        type: ADD_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log({ err }.err.message);
      //  dispatch(returnErrors({err},err.message, err.response.status));
    });
};

export const addGroupMember =
  (groupName, passcode, memberID) => (dispatch, getState) => {
    axios
      .post("http://localhost:3005/api/groups/users", {
        groupname: groupName,
        passcode: passcode,
        userid: memberID,
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

export const removeGroupMember = (GroupID, UserID) => (dispatch) => {
  axios
    .post("http://localhost:3005/api/groups/removeUser", {
      groupID: GroupID,
      userID: UserID,
    })
    .then(
      dispatch({
        type: REMOVE_GROUP_MEMBER,
        payload: UserID,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setActiveGroup = (Group) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_GROUP,
    payload: {
      Group: Group,
    },
  });
};

export const deleteGroup = (id) => (dispatch) => {
  axios
    .delete(`/api/groups/delete?groupid=${id}`)
    .then(
      dispatch({
        type: DELETE_GROUP,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const leaveGroup = (groupID, userID) => (dispatch) => {
  axios
    .post("/api/groups/removeUser", {
      groupID: groupID,
      userID: userID,
    })
    .then(
      dispatch({
        type: LEAVE_GROUP,
        payload: groupID,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setGroupsLoading = () => {
  return {
    type: USER_GROUPS_LOADING,
  };
};

export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING,
  };
};

export const setGroupMembersLoading = () => {
  return {
    type: GROUP_MEMBERS_LOADING,
  };
};

export const selectEditGroup = (group) => (dispatch) => {
  dispatch({
    type: SELECT_EDIT_GROUP,
    payload: {
      displayEditGroupModal: true,
      groupDetails: group,
    },
  });
};

export const unSelectEditGroup = () => (dispatch) => {
  dispatch({
    type: UNSELECT_EDIT_GROUP,
    payload: {
      displayEditGroupModal: false,
      groupDetails: null,
    },
  });
};
