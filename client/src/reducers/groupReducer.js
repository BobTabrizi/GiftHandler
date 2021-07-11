import {
  GET_GROUPS,
  ADD_GROUP,
  DELETE_GROUP,
  GROUPS_LOADING,
  ADD_GROUP_MEMBER,
} from "../actions/types";

const initialState = {
  groups: [],
  currentGroup: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
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
    case GROUPS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
