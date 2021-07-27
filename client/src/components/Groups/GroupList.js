import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/PageStyles/ManageGroup.css";
import { Link } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import { IoPencilSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { selectEditGroup } from "../../actions/groupActions";
import { leaveGroup } from "../../actions/groupActions";
import { GrLogout } from "react-icons/gr";
import { setActiveModal, updateModalData } from "../../actions/modalActions";
/**
 * @PageLocation ManageGroup
 * @Component GroupList
 * @Description Array of groups that link to respective group pages
 *              Takes in a parameter string of "Admin" or "Member"
 *              filtering group data for owned/unowned groups
 *
 */

const ModeList = {
  0: "Secret Santa",
  1: "Wedding",
  2: "Other",
};

export const GroupList = ({ FilterType }) => {
  const groups = useSelector((state) => state.group.groups);
  const userID = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const handleEditGroup = (group) => {
    dispatch(selectEditGroup(group));
  };

  const handleLeaveGroup = (groupID) => {
    dispatch(setActiveModal("Confirm"));

    let ModalData = {
      ActionID: 0,
      groupID: groupID,
      userID: userID,
    };
    dispatch(updateModalData(ModalData));
    //dispatch(leaveGroup(groupID, userID));
  };

  return (
    <>
      <div className="GroupListHeader">
        <div className="GroupNameHeader">Group Name</div>
        <div className="VerticalLine"></div>
        <div className="GroupTypeHeader">Group Type</div>
        <div className="VerticalLine"></div>
        <div className="GroupActionHeader">Edit</div>
      </div>
      <div className="GroupListContainer">
        {groups &&
          groups
            .filter((group) => group.role === FilterType)
            .map((group, index) => (
              <div className="GroupContainer" key={index}>
                <div className="GroupLabel">
                  {group.mode !== 1 && (
                    <Link
                      to={`/groups/${group.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      {group.groupname}
                    </Link>
                  )}
                  {group.mode === 1 && (
                    <Link
                      to={`/groups/${group.id}/event/users/${userID}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      {group.groupname}
                    </Link>
                  )}
                </div>
                <div className="VerticalLine"></div>
                <div className="GroupMode">
                  <div className="GroupModeLabel">{ModeList[group.mode]}</div>
                </div>
                <div className="VerticalLine"></div>
                {FilterType === "Member" && (
                  <div className="GroupActions">
                    <div className="LeaveGroupBtn">
                      <GrLogout onClick={() => handleLeaveGroup(group.id)} />
                    </div>
                  </div>
                )}

                {FilterType === "Admin" && (
                  <div className="GroupActions">
                    <div className="SettingsGroupBtn">
                      <IoSettingsSharp onClick={() => handleEditGroup(group)} />
                    </div>
                  </div>
                )}
              </div>
            ))}
      </div>
    </>
  );
};
