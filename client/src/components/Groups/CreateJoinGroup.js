import React, { useState } from "react";
import "../../styles/PageStyles/ManageGroup.css";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModal } from "../../actions/modalActions";
import { setModalPage } from "../../actions/modalActions";
/**
 * @PageLocation ManageGroup
 * @Component CreateJoinGroup
 * @Description Wrapper Component for Group Creation/Deletion
 *
 */
export const CreateJoinGroup = () => {
  const dispatch = useDispatch();

  const handleModal = (ModalType) => {
    if (ModalType === "Add") {
      dispatch(setActiveModal("Group"));
      dispatch(setModalPage("ModeSelect"));
    } else {
      dispatch(setActiveModal("Group"));
      dispatch(setModalPage("JoinRegister"));
    }
  };

  return (
    <>
      <div className="GroupManageContainer">
        <div className="CreateBtn">
          <button
            className="ActionButton"
            id="Abtn"
            onClick={() => handleModal("Add")}
          >
            CREATE A GROUP
          </button>
        </div>
        <div className="JoinBtn">
          <button
            className="ActionButton"
            id="Jbtn"
            onClick={() => handleModal("Join")}
          >
            JOIN A GROUP
          </button>
        </div>
      </div>
    </>
  );
};
