import {
  GET_USERS_GROUPS,
  ADD_GROUP,
  GET_GROUP,
  SELECT_EDIT_GROUP,
  UNSELECT_EDIT_GROUP,
  DELETE_GROUP,
  LEAVE_GROUP,
  USER_GROUPS_LOADING,
  REMOVE_GROUP_MEMBER,
  GROUP_LOADING,
  ADD_GROUP_MEMBER,
  GET_GROUP_MEMBERS,
  GROUP_MEMBERS_LOADING,
  SET_ACTIVE_GROUP,
  ASSIGN_PARTNERS,
  CLEAR_CURRENT_GROUP,
} from "../actions/types";

const initialState = {
  groups: null,
  currentGroup: {
    Group: {
      id: null,
      name: null,
      groupname: null,
      role: null,
    },
  },
  selectedGroup: {
    displayEditGroupModal: false,
    groupDetails: null,
    groupMembers: null,
  },
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
        selectedGroup: {
          displayEditGroupModal: state.selectedGroup.displayEditGroupModal,
          groupDetails: { ...state.selectedGroup.groupDetails },
          groupMembers: action.payload,
        },
        loading: false,
      };
    case SET_ACTIVE_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
      };
    case SELECT_EDIT_GROUP:
    case UNSELECT_EDIT_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
      };
    case REMOVE_GROUP_MEMBER:
      return {
        ...state,
        selectedGroup: {
          displayEditGroupModal: state.selectedGroup.displayEditGroupModal,
          groupDetails: { ...state.selectedGroup.groupDetails },
          groupMembers: state.selectedGroup.groupMembers.filter(
            (user) => user.id !== action.payload
          ),
        },
      };

    case CLEAR_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
      };
    case LEAVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload),
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload),
      };
    case ADD_GROUP:
      return {
        ...state,
        groups: [action.payload, ...state.groups],
      };
    case ADD_GROUP_MEMBER:
      return {
        ...state,
        groups: [action.payload, ...state.groups],
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
