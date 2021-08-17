/**
 * @PageLocation HomePage
 * @Component AddJoinGroupModal
 * @Description Allows users to create or join a group.
 *              On creation, user's are prompted to pick a type of group then enter a name/passcode.
 *              On join, user's simply need to enter a valid groupname and corresponding passcode.
 *
 */

import React, { useEffect, useState } from "react";
import "../../../styles/GroupStyles/GroupModals.css";
import { useDispatch, useSelector } from "react-redux";
import { ModeSelect } from "../ModalComponents/AddGroupModal/ModeSelect";
import { EventInfo } from "../ModalComponents/AddGroupModal/EventInfo";
import { GroupRegister } from "../ModalComponents/AddGroupModal/GroupRegister";
import { GroupImage } from "../ModalComponents/AddGroupModal/GroupImage";
import { AddSuccess } from "../ModalComponents/AddGroupModal/AddSuccess";
import { JoinRegister } from "../ModalComponents/JoinGroupModal/JoinRegister";
import { deactivateModal, setModalPage } from "../../../actions/modalActions";
import { IoArrowBack } from "react-icons/io5";

export const AddJoinGroupModal = () => {
  const ActiveModal = useSelector(
    (state) => state.modal.activeModal.activePage
  );
  const [modalComponent, setModalComponent] = useState(<ModeSelect />);
  const [modalTitle, setModalTitle] = useState("ModeSelect");
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(deactivateModal());
  };

  const TraverseModal = () => {
    switch (ActiveModal) {
      case "GroupImage":
        dispatch(setModalPage("ModeSelect"));
        break;
      case "GroupRegister":
        dispatch(setModalPage("EventInfo"));
        break;
      case "EventInfo":
        dispatch(setModalPage("GroupImage"));
        break;
    }
  };

  useEffect(() => {
    switch (ActiveModal) {
      case "ModeSelect":
        setModalComponent(<ModeSelect />);
        setModalTitle("Create a Group");
        break;

      case "GroupRegister":
        setModalComponent(<GroupRegister />);
        break;

      case "AddSuccess":
        setModalComponent(<AddSuccess />);
        break;
      case "JoinRegister":
        setModalComponent(<JoinRegister />);
        setModalTitle("Join a Group");
        break;
      case "EventInfo":
        setModalComponent(<EventInfo />);
        break;
      case "GroupImage":
        setModalComponent(<GroupImage />);
        break;
    }
  }, [ActiveModal]);

  return (
    <>
      <div className="GrpModalBackground">
        <div className="AddGrpModalContainer">
          <div className="GrpModalHeader">
            <div>
              <IoArrowBack
                onClick={() => TraverseModal()}
                style={{
                  cursor: "pointer",
                  visibility:
                    ActiveModal === "ModeSelect" ||
                    ActiveModal === "JoinRegister" ||
                    ActiveModal === "AddSuccess"
                      ? "hidden"
                      : "visible",
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
