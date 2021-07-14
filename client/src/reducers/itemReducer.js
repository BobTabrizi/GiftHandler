import {
  GET_ITEMS,
  ADD_ITEM,
  ADD_IMAGE,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: null,
  memberItems: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        memberItems: action.payload,
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        memberItems: [...state.memberItems, action.payload],
        loading: false,
      };
    case ADD_IMAGE:
      return {
        ...state,
        image: action.payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        memberItems: state.memberItems.filter(
          (item) => item.itemid !== action.payload
        ),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}