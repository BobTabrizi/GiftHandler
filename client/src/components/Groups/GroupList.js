import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/PageStyles/ManageGroup.css";
import { Link } from "react-router-dom";
import { BiShieldQuarter } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { selectEditGroup } from "../../actions/groupActions";
import { setActiveModal, updateModalData } from "../../actions/modalActions";
/**
 * @PageLocation Home Page
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
  };

  return (
    <>
      <div className="GroupListContainer">
        {groups &&
          groups.map((group, index) => (
            <div className="GroupContainer" key={index}>
              {group.grouptype !== 1 && (
                <div className="GroupBody">
                  {group.role === "Admin" && (
                    <div
                      className="GroupActionBtn"
                      onClick={() => handleEditGroup(group)}
                    >
                      <BiShieldQuarter
                        style={{
                          fontSize: "30",
                          marginLeft: "13%",
                          marginTop: "10%",
                        }}
                      />
                    </div>
                  )}
                  {group.role === "Member" && (
                    <div
                      className="GroupActionBtn"
                      onClick={() => handleLeaveGroup(group.groupid)}
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
                    to={`/groups/${group.groupid}/users/${userID}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={`/api/images/${group.groupimage}`}
                      style={{
                        width: 250,
                        height: 150,
                        borderRadius: 25,
                      }}
                      alt="Group"
                    ></img>
                  </Link>
                  <div className="GroupTitle">{group.groupname}</div>
                </div>
              )}
              {group.grouptype === 1 && (
                <div className="GroupBody">
                  {group.role === "Admin" && (
                    <div
                      className="GroupActionBtn"
                      onClick={() => handleEditGroup(group)}
                    >
                      <BiShieldQuarter
                        style={{
                          fontSize: "30",
                          marginLeft: "10%",
                          marginTop: "10%",
                        }}
                      />
                    </div>
                  )}
                  <Link
                    to={`/groups/${group.groupid}/event/users/${userID}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={`/api/images/${group.groupimage}`}
                      style={{
                        width: 250,
                        height: 150,
                        borderRadius: 25,
                      }}
                      alt="Event Group"
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
