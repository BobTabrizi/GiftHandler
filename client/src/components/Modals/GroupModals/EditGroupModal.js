/**
 *
 * @PageLocation HomePage
 * @Component EditGroupModal
 * @Description Modal that allows a user to edit and delete an owned group
 *
 */

import React, { useState, useEffect } from "react";
import "../../../styles/GroupStyles/GroupModals.css";
import { useDispatch, useSelector } from "react-redux";
import { unSelectEditGroup } from "../../../actions/groupActions";
import { Menu } from "../ModalComponents/EditGroupModal/Menu";
import { Passcode } from "../ModalComponents/EditGroupModal/Passcode";
import { Members } from "../ModalComponents/EditGroupModal/Members";
import { ConfirmDelete } from "../ModalComponents/EditGroupModal/ConfirmDelete";
import { ChangeDescription } from "../ModalComponents/EditGroupModal/ChangeDescription";
import { deactivateModal, setModalPage } from "../../../actions/modalActions";
import { IoArrowBack } from "react-icons/io5";

export const EditGroupModal = () => {
  const ActiveModal = useSelector(
    (state) => state.modal.activeModal.activePage
  );
  const ShowModal = useSelector(
    (state) => state.group.selectedGroup.displayEditGroupModal
  );
  const [modalComponent, setModalComponent] = useState(<Menu />);
  const [modalTitle, setModalTitle] = useState("Menu");
  const dispatch = useDispatch();

  /*     Move back to modal menu     */
  const changeModal = () => {
    dispatch(setModalPage("GroupMenu"));
  };

  /* Close modal entirely */
  const handleModalClose = async () => {
    dispatch(unSelectEditGroup());
    dispatch(deactivateModal());
  };

  /*Render modal pages based on redux store state */
  useEffect(() => {
    switch (ActiveModal) {
      case "GroupMenu":
        setModalComponent(<Menu />);
        setModalTitle("Menu");
        break;

      case "Passcode":
        setModalComponent(<Passcode />);
        setModalTitle("Change Passcode");
        break;

      case "ManageMembers":
        setModalComponent(<Members />);
        setModalTitle("Manage Members");
        break;

      case "ChangeDescription":
        setModalComponent(<ChangeDescription />);
        setModalTitle("Edit Description");
        break;

      case "Delete":
        setModalComponent(<ConfirmDelete />);
        setModalTitle("Delete Group");
        break;
    }
    const handleClick = (e) => {
      if (e.target && e.target.className === "GrpModalBackground") {
        dispatch(unSelectEditGroup());
        dispatch(deactivateModal());
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
          <div className="GrpModalHeader">
            <div>
              <IoArrowBack
                onClick={() => changeModal("Menu")}
                style={{
                  cursor: "pointer",
                  visibility: modalTitle === "Menu" ? "hidden" : "visible",
                }}
              />
            </div>
            <div>{modalTitle}</div>
            <div className="modalCloseButton">
              <button
                onClick={() => handleModalClose()}
                style={{ fontSize: 22, cursor: "pointer" }}
              >
                X
              </button>
            </div>
          </div>
          {modalComponent}
        </div>
      </div>
    </>
  );
};
