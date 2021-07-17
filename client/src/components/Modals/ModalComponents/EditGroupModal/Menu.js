import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/Modal.css";
import { setActiveModal } from "../../../../actions/modalActions";
/**
 *
 * @PageLocation GroupPage
 * @Component Menu
 * @Description Modal Component for the Edit Group Modal
 *
 *
 */
export const Menu = () => {
  const dispatch = useDispatch();
  const GroupID = useSelector(
    (state) => state.group.selectedGroup.groupDetails.id
  );
  const GroupPasscode = useSelector(
    (state) => state.group.selectedGroup.groupDetails.passcode
  );
  const handleModalChange = (modalType) => {
    dispatch(setActiveModal(modalType));
  };

  return (
    <>
      <div className="EditModalHeader">
        <div>Edit Group</div>
      </div>
      <div className="body">
        <h3>Group Passcode: {GroupPasscode}</h3>
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => handleModalChange("Passcode")}
        >
          Change Passcode
        </h2>
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => handleModalChange("Members")}
        >
          Manage Members
        </h2>
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => handleModalChange("Delete")}
        >
          Delete Group
        </h2>
      </div>
      <div className="footer">
        <div className="modalCreateButton">
          <button
            style={{ fontSize: 22, cursor: "pointer" }}
            onClick={() => console.log("HI")}
          >
            Exit
          </button>
        </div>
      </div>
    </>
  );
};
