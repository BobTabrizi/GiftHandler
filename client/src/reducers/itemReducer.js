/**
 *
 * @Component itemReducer.js
 * @Description Reducer function for item manipulation.
 *
 */

import {
  GET_ITEMS,
  ADD_ITEM,
  ADD_IMAGE,
  DELETE_ITEM,
  EDIT_ITEM,
  SELECT_EDIT_ITEM,
  UNSELECT_EDIT_ITEM,
  ITEMS_LOADING,
  FILTER_ITEM,
  SET_FILTER_ITEM,
  CLEAR_FILTER_ITEMS,
  CLEAR_ITEMS,
  SELECT_VIEW_ITEM,
} from "../actions/types";

const initialState = {
  filteredItems: null,
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
    case SET_FILTER_ITEM:
      return {
        ...state,
        filteredItems: [action.payload],
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        memberItems: null,
      };
    case CLEAR_FILTER_ITEMS:
      return {
        ...state,
        filteredItems: null,
      };
    case FILTER_ITEM:
      let lowPriceFilter;
      let highPriceFilter;
      let filteredItems;

      //If the less than filter is set, convert to a number
      if (action.payload.FilterParam.LowerThan) {
        lowPriceFilter = Number(
          action.payload.FilterParam.LowerThan.substring(1)
        );
      }

      //If the more than filter is set, convert to a number
      if (action.payload.FilterParam.MoreThan) {
        highPriceFilter = Number(
          action.payload.FilterParam.MoreThan.substring(1)
        );
      }

      //Filter items based on filter parameters set. Convert item prices to numbers
      if (lowPriceFilter && highPriceFilter) {
        filteredItems = state.memberItems.filter(
          (item) =>
            Number(item.price.replace(/[^0-9.]+/g, "")) < lowPriceFilter &&
            Number(item.price.replace(/[^0-9.]+/g, "")) > highPriceFilter
        );
      } else if (lowPriceFilter) {
        filteredItems = state.memberItems.filter(
          (item) => Number(item.price.replace(/[^0-9.]+/g, "")) < lowPriceFilter
        );
      } else if (highPriceFilter) {
        filteredItems = state.memberItems.filter(
          (item) =>
            Number(item.price.replace(/[^0-9.]+/g, "")) > highPriceFilter
        );
      }
      return {
        ...state,
        filteredItems: filteredItems,
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
    case SELECT_VIEW_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case SELECT_EDIT_ITEM:
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
