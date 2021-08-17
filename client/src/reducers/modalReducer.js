/**
 *
 * @Component modalReducer.js
 * @Description Reducer function for modal data and states
 *
 */

import {
  SET_ACTIVE_MODAL,
  SET_MODAL_PAGE,
  UPDATE_MODAL_DATA,
  DEACTIVATE_MODAL,
} from "../actions/types";

const initialState = {
  activeModal: {
    modalType: null,
    activePage: null,
  },
  modalData: null,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_MODAL:
      return {
        ...state,
        activeModal: action.payload,
      };
    case SET_MODAL_PAGE:
      return {
        ...state,
        activeModal: {
          activePage: action.payload,
          modalType: state.activeModal.modalType,
        },
      };
    case DEACTIVATE_MODAL:
      return {
        ...state,
        activeModal: "Main",
        modalData: null,
      };
    case UPDATE_MODAL_DATA:
      return {
        ...state,
        modalData: action.payload,
      };
    default:
      return state;
  }
}
