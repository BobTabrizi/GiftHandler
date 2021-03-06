/**
 *
 * @PageLocation HomePage (EditGroupModal)
 * @Component Menu
 * @Description Landing modal page for editing groups.
 *              Presents options of changing passcode, managing members, and deleting the group.
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { setModalPage } from "../../../../actions/modalActions";

export const Menu = () => {
  const dispatch = useDispatch();
  const GroupDetails = useSelector(
    (state) => state.group.selectedGroup.groupDetails
  );
  const handleModalChange = (modalType) => {
    dispatch(setModalPage(modalType));
  };

  return (
    <>
      <div className="MenuContainer">
        <h3>Group Passcode: {GroupDetails.passcode}</h3>
        <div className="MenuBody">
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => handleModalChange("Passcode")}
          >
            Change Passcode
          </h2>
          {GroupDetails.grouptype !== 1 && (
            <h2
              style={{ cursor: "pointer" }}
              onClick={() => handleModalChange("ManageMembers")}
            >
              Manage Members
            </h2>
          )}

          <h2
            style={{ cursor: "pointer" }}
            onClick={() => handleModalChange("ChangeDescription")}
          >
            Edit Description
          </h2>

          <h2
            style={{ cursor: "pointer" }}
            onClick={() => handleModalChange("Delete")}
          >
            Delete Group
          </h2>
        </div>
      </div>
    </>
  );
};
