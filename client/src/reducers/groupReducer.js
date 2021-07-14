import {
  GET_USERS_GROUPS,
  ADD_GROUP,
  GET_GROUP,
  DELETE_GROUP,
  USER_GROUPS_LOADING,
  GROUP_LOADING,
  ADD_GROUP_MEMBER,
  GET_GROUP_MEMBERS,
  GROUP_MEMBERS_LOADING,
} from "../actions/types";

const initialState = {
  groups: [{ id: -1, groupname: "GROUP_NAME" }],
  currentGroup: [],
  pageGroup: [],
  loading: false,
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_GROUPS:
      return {
        ...state,
        groups: action.payload,
        loading: false,
      };
    case GET_GROUP:
      return {
        ...state,
        pageGroup: action.payload,
        loading: false,
      };
    case GET_GROUP_MEMBERS:
      return {
        ...state,
        groupMembers: action.payload,
        loading: false,
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload),
      };
    case ADD_GROUP:
      return {
        ...state,
        groups: [action.payload, ...state.items],
      };
    case ADD_GROUP_MEMBER:
      return {
        ...state,
        currentGroup: [action.payload, ...state.items],
      };

    case GROUP_LOADING:
    case USER_GROUPS_LOADING:
    case GROUP_MEMBERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
