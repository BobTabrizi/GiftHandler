import { SET_ACTIVE_MODAL } from "../actions/types";

const initialState = {
  activeModal: "Main",
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_MODAL:
      return {
        ...state,
        activeModal: action.payload,
      };
    default:
      return state;
  }
}
