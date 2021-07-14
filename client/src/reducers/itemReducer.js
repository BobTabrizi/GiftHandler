import {
  GET_ITEMS,
  ADD_ITEM,
  ADD_IMAGE,
  DELETE_ITEM,
  EDIT_ITEM,
  SELECT_EDIT_ITEM,
  UNSELECT_EDIT_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: null,
  memberItems: null,
  selectedItem: {
    displayEditModal: false,
    itemDetails: null,
  },
  loading: false,
};

export default function itemReducer(state = initialState, action) {
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
    case EDIT_ITEM:
      let arr = state.memberItems;
      const idx = state.memberItems.findIndex(
        (x) => x.itemid === action.payload.payload.itemid
      );
      arr[idx] = action.payload.payload;
      return {
        ...state,
        selectedItem: action.payload,
        memberItems: arr,
      };
    case SELECT_EDIT_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case UNSELECT_EDIT_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
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
