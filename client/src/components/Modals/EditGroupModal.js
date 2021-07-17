import React, { useState, useEffect } from "react";
import "../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { unSelectEditGroup } from "../../actions/groupActions";
import { Menu } from "./ModalComponents/EditGroupModal/Menu";
import { Passcode } from "./ModalComponents/EditGroupModal/Passcode";
import { Members } from "./ModalComponents/EditGroupModal/Members";
import { ConfirmDelete } from "./ModalComponents/EditGroupModal/ConfirmDelete";
import { setActiveModal } from "../../actions/modalActions";
/**
 *
 * @PageLocation Dashboard
 * @Component EditGroupModal
 * @Description Modal that allows a user to edit an owned group
 *
 */
export const EditGroupModal = () => {
  const ActiveModal = useSelector(
    (state) => state.modal.activeModal.activePage
  );
  const [modalComponent, setModalComponent] = useState(<Menu />);
  const dispatch = useDispatch();

  /* Close modal entirely and set active modal to base case of menu */
  const handleModalClose = async () => {
    dispatch(setActiveModal("Main"));
    dispatch(unSelectEditGroup());
  };

  /*Render modal pages based on redux store state */
  useEffect(() => {
    if (ActiveModal === "Main") setModalComponent(<Menu />);
    if (ActiveModal === "Passcode") setModalComponent(<Passcode />);
    if (ActiveModal === "Members") setModalComponent(<Members />);
    if (ActiveModal === "Delete") setModalComponent(<ConfirmDelete />);
  }, [ActiveModal]);

  return (
    <>
      <div className="GroupModalBackground">
        <div className="modalContainer">
          <div className="EditGroupCloseBtn">
            <button
              onClick={() => handleModalClose()}
              style={{ fontSize: 22, cursor: "pointer" }}
            >
              X
            </button>
          </div>
          {modalComponent}
        </div>
      </div>
    </>
  );
};
