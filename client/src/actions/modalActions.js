import {
  SET_ACTIVE_MODAL,
  UPDATE_MODAL_DATA,
  DEACTIVATE_MODAL,
  SET_MODAL_PAGE,
} from "./types";

export const setActiveModal = (modalType) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_MODAL,
    payload: {
      modalType: modalType,
    },
  });
};

export const setModalPage = (modalPage) => (dispatch) => {
  dispatch({
    type: SET_MODAL_PAGE,
    payload: modalPage,
  });
};

export const deactivateModal = () => (dispatch) => {
  dispatch({
    type: DEACTIVATE_MODAL,
    payload: {
      activePage: null,
      modalType: null,
    },
  });
};

export const updateModalData = (Data) => (dispatch) => {
  dispatch({
    type: UPDATE_MODAL_DATA,
    payload: {
      addGroupSettings: Data,
    },
  });
};
