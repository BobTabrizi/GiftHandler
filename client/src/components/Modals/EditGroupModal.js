import React, { useState, useEffect } from "react";
import "../../styles/GroupStyles/GroupModals.css";
import { useDispatch, useSelector } from "react-redux";
import { unSelectEditGroup } from "../../actions/groupActions";
import { Menu } from "./ModalComponents/EditGroupModal/Menu";
import { Passcode } from "./ModalComponents/EditGroupModal/Passcode";
import { Members } from "./ModalComponents/EditGroupModal/Members";
import { ConfirmDelete } from "./ModalComponents/EditGroupModal/ConfirmDelete";
/**
 *
 * @PageLocation ManageGroup
 * @Component EditGroupModal
 * @Description Modal that allows a user to edit and delete an owned group
 *
 */
export const EditGroupModal = () => {
  const ActiveModal = useSelector(
    (state) => state.modal.activeModal.activePage
  );
  const ShowModal = useSelector(
    (state) => state.group.selectedGroup.displayEditGroupModal
  );
  const [modalComponent, setModalComponent] = useState(<Menu />);
  const dispatch = useDispatch();

  /* Close modal entirely */
  const handleModalClose = async () => {
    dispatch(unSelectEditGroup());
  };

  /*Render modal pages based on redux store state */
  useEffect(() => {
    switch (ActiveModal) {
      case "GroupMenu":
        setModalComponent(<Menu />);
        break;

      case "Passcode":
        setModalComponent(<Passcode />);
        break;

      case "ManageMembers":
        setModalComponent(<Members />);
        break;

      case "Delete":
        setModalComponent(<ConfirmDelete />);
        break;
    }
    const handleClick = (e) => {
      if (e.target && e.target.className === "GroupModalBackground") {
        dispatch(unSelectEditGroup());
      }
    };
    if (ShowModal) {
      window.addEventListener("click", handleClick);
    }
  }, [ActiveModal]);

  return (
    <>
      <div className="GrpModalBackground">
        <div className="GrpModalContainer">
          <div className="modalCloseButton">
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
