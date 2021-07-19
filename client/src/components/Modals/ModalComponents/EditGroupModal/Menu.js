import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { setModalPage } from "../../../../actions/modalActions";
/**
 *
 * @PageLocation ManageGroups
 * @Component Menu
 * @Description Landing modal page for editing groups.
 *              Presents options of changing passcode, managing members, and deleting the group.
 *
 *
 */
export const Menu = () => {
  const dispatch = useDispatch();
  const GroupPasscode = useSelector(
    (state) => state.group.selectedGroup.groupDetails.passcode
  );
  const handleModalChange = (modalType) => {
    dispatch(setModalPage(modalType));
  };

  return (
    <>
      <div className="MenuContainer">
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
            onClick={() => handleModalChange("ManageMembers")}
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
      </div>
    </>
  );
};
