import React, { useEffect, useState } from "react";
import "../../styles/GroupStyles/GroupModals.css";
import { useDispatch, useSelector } from "react-redux";
import { ModeSelect } from "./ModalComponents/AddGroupModal/ModeSelect";
import { GroupRegister } from "./ModalComponents/AddGroupModal/GroupRegister";
import { AddSuccess } from "./ModalComponents/AddGroupModal/AddSuccess";
import { JoinRegister } from "./ModalComponents/JoinGroupModal/JoinRegister";
import { deactivateModal } from "../../actions/modalActions";
/**
 * @PageLocation ManageGroup
 * @Component GroupModal
 * @Description Allows users to create or join a group.
 *
 *              On creation, user's are prompted to pick a type of group then enter a name/passcode.
 *              On join, user's simply need to enter a valid groupname and corresponding passcode.
 *
 */
export const GroupModal = () => {
  const ActiveModal = useSelector(
    (state) => state.modal.activeModal.activePage
  );
  const ShowModal = useSelector((state) => state.modal.activeModal.modalType);
  const [modalComponent, setModalComponent] = useState(<ModeSelect />);
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(deactivateModal());
  };

  useEffect(() => {
    switch (ActiveModal) {
      case "ModeSelect":
        setModalComponent(<ModeSelect />);
        break;

      case "GroupRegister":
        setModalComponent(<GroupRegister />);
        break;

      case "AddSuccess":
        setModalComponent(<AddSuccess />);
        break;

      case "JoinRegister":
        setModalComponent(<JoinRegister />);
        break;
    }

    const handleClick = (e) => {
      if (e.target && e.target.className === "GrpModalBackground") {
        dispatch(deactivateModal());
      }
    };
    if (ShowModal === "Group") {
      window.addEventListener("click", handleClick);
    }
  }, [ShowModal, ActiveModal]);

  return (
    <>
      <div className="GrpModalBackground">
        <div className="GrpModalContainer">
          <div className="modalCloseButton">
            <button onClick={() => handleModalClose()} style={{ fontSize: 22 }}>
              X
            </button>
          </div>
          {modalComponent}
        </div>
      </div>
    </>
  );
};
