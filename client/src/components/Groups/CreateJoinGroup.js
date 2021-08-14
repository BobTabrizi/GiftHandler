import React from "react";
import "../../styles/PageStyles/ManageGroup.css";
import { useDispatch } from "react-redux";
import { setActiveModal } from "../../actions/modalActions";
import { setModalPage } from "../../actions/modalActions";
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
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
        <div className="JoinBtn">
          <button
            className="ActionButton"
            id="Jbtn"
            onClick={() => handleModal("Join")}
          >
            <FaPlus
              style={{
                verticalAlign: "middle",
                fontSize: 19,
                marginRight: "0.5rem",
                marginBottom: "0.1rem",
              }}
            ></FaPlus>
            Join Group
          </button>
        </div>
        <div className="CreateBtn">
          <button
            className="ActionButton"
            id="Abtn"
            onClick={() => handleModal("Add")}
          >
            <FaPen
              style={{
                verticalAlign: "middle",
                fontSize: 17,
                marginBottom: "0.1rem",
                marginRight: "0.5rem",
              }}
            />
            Create Group
          </button>
        </div>
      </div>
    </>
  );
};
