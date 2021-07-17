import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/ManageGroup.css";
import { Link } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import { IoPencilSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { selectEditGroup } from "../../actions/groupActions";
import { leaveGroup } from "../../actions/groupActions";
import { GrLogout } from "react-icons/gr";
/**
 * @PageLocation ManageGroup
 * @Component GroupList
 * @Description Array of groups that link to respective group pages
 *              Takes in a parameter string of "Admin" or "Member"
 *              filtering group data for owned/unowned groups
 *
 */
export const GroupList = ({ FilterType }) => {
  const groups = useSelector((state) => state.group.groups);
  const userID = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const handleEditGroup = (group) => {
    dispatch(selectEditGroup(group));
  };

  const handleLeaveGroup = (groupID) => {
    dispatch(leaveGroup(groupID, userID));
  };
  return (
    <>
      <div className="GroupListContainer">
        {groups &&
          groups
            .filter((group) => group.role === FilterType)
            .map((group, index) => (
              <div className="GroupContainer" key={index}>
                <div className="GroupLabel">
                  <Link
                    to={`/groups/${group.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {group.groupname}
                  </Link>
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
