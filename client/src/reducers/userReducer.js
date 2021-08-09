import { GET_EXT_USER, EXT_USER_LOADING } from "../actions/types";

const initialState = {
  externalUser: null,
  loading: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXT_USER:
      return {
        ...state,
        externalUser: action.payload,
        loading: false,
      };

    case EXT_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
