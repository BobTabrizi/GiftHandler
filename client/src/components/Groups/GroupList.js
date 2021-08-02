import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/PageStyles/ManageGroup.css";
import { Link } from "react-router-dom";
import { IoKey } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
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

export const GroupList = () => {
  const groups = useSelector((state) => state.group.groups);
  const userID = useSelector((state) => state.auth.user.id);

  const [groupImage, setGroupImage] = useState("DefaultGroupImage");
  const dispatch = useDispatch();

  const handleEditGroup = (group) => {
    dispatch(selectEditGroup(group));
  };

  const HandleGrpAction = (GroupType) => {
    if (GroupType === "AdminNW") {
    }
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
      <div className="GroupListContainer">
        {groups &&
          groups.map((group, index) => (
            <div className="GroupContainer" key={index}>
              {group.mode !== 1 && (
                <div className="GroupBody">
                  {group.role === "Admin" && (
                    <div
                      className="GroupActionBtn"
                      onClick={() => handleEditGroup(group)}
                    >
                      <IoKey
                        style={{
                          fontSize: "30",
                          marginLeft: "10%",
                          marginTop: "10%",
                        }}
                      />
                    </div>
                  )}
                  {group.role === "Member" && (
                    <div
                      className="GroupActionBtn"
                      onClick={() => handleLeaveGroup(group.id)}
                    >
                      <IoPerson
                        style={{
                          fontSize: "30",
                          marginLeft: "10%",
                          marginTop: "10%",
                        }}
                      />
                    </div>
                  )}
                  <Link
                    to={`/groups/${group.id}/users/${userID}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={`/api/images/${groupImage}`}
                      style={{
                        width: 225,
                        height: 175,
                        borderRadius: 25,
                      }}
                    ></img>
                  </Link>
                  <div className="GroupTitle">{group.groupname}</div>
                </div>
              )}
              {group.mode === 1 && (
                <div className="GroupBody">
                  {group.role === "Admin" && (
                    <div
                      className="GroupActionBtn"
                      onClick={() => handleEditGroup(group)}
                    >
                      <IoKey
                        style={{
                          fontSize: "30",
                          marginLeft: "10%",
                          marginTop: "10%",
                        }}
                      />
                    </div>
                  )}
                  <Link
                    to={`/groups/${group.id}/event/users/${userID}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={`/api/images/${groupImage}`}
                      style={{
                        width: 225,
                        height: 175,
                        borderRadius: 25,
                      }}
                    ></img>
                  </Link>
                  <div className="GroupTitle">{group.groupname}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};
