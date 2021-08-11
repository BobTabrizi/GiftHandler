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
  ASSIGN_PARTNERS,
  CLEAR_CURRENT_GROUP,
  CLEAR_PAGE_GROUP,
  EDIT_GROUP_DETAILS,
} from "./types";
import { returnErrors } from "./errorActions";

export const getGroups = (id) => (dispatch) => {
  dispatch(setGroupsLoading());
  axios
    .get(`/api/groups/user/${id}`, {})
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
    .get(`/api/groups/${groupid}`)
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
    .get(`/api/groups/members/${groupid}`, {})
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

export const addGroup = (GroupDetails) => async (dispatch) => {
  let Response = await axios
    .post("/api/groups/create", {
      GroupDetails,
    })
    .then((res) => {
      dispatch({
        type: ADD_GROUP,
        payload: res.data,
      });
      return "Success";
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return err.response.data;
    });

  return Response;
};

export const addGroupMember =
  (groupName, passcode, memberID) => async (dispatch) => {
    let Response = await axios
      .post("/api/groups/addMember", {
        groupname: groupName,
        passcode: passcode,
        userid: memberID,
      })
      .then((res) => {
        dispatch({
          type: ADD_GROUP_MEMBER,
          payload: res.data,
        });
        return "Success";
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        return err.response.data;
      });

    return Response;
  };

export const removeGroupMember = (GroupID, UserID) => (dispatch) => {
  axios
    .delete("/api/groups/removeMember", {
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
    .delete(`/api/groups/delete/${id}`)
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

export const EditGroupDetails = (GroupDetails) => async (dispatch) => {
  let Response = await axios
    .post("/api/groups/edit", {
      GroupDetails,
    })
    .then((res) => {
      dispatch({
        type: EDIT_GROUP_DETAILS,
        payload: GroupDetails,
      });
      return res;
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  return Response;
};

export const assignPartners = (GroupParameters) => (dispatch) => {
  axios
    .post("/api/groups/assignPartners", {
      GroupParameters,
    })
    .then(() => {
      dispatch({
        type: ASSIGN_PARTNERS,
        payload: GroupParameters,
      });

      dispatch(getGroupMembers(GroupParameters.GroupID));
    })
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

export const clearCurrentGroup = () => {
  return {
    type: CLEAR_CURRENT_GROUP,
    payload: {
      Group: {
        id: null,
        name: null,
        groupname: null,
        role: null,
      },
    },
  };
};

export const clearPageGroup = () => {
  return {
    type: CLEAR_PAGE_GROUP,
    payload: [],
  };
};
