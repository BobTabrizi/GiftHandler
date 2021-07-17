import { SET_ACTIVE_MODAL } from "./types";

export const setActiveModal = (modalPage) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_MODAL,
    payload: {
      activePage: modalPage,
    },
  });
};
