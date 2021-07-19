import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { getGroupMembers } from "../../../../actions/groupActions";
import { setModalPage } from "../../../../actions/modalActions";
import { removeGroupMember } from "../../../../actions/groupActions";
import { IoBan } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
/**
 *
 * @PageLocation ManageGroups
 * @Component Members
 * @Description Displays a list of members in a selected group, and allows group admins to kick members.
 *
 *
 */
export const Members = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const GroupID = useSelector(
    (state) => state.group.selectedGroup.groupDetails.id
  );
  const GroupMembers = useSelector(
    (state) => state.group.selectedGroup.groupMembers
  );
  const dispatch = useDispatch();

  /*  Displays Confirmation Modal */
  const confirmKick = (UserID) => {
    setConfirmModal(true);
    setSelectedUserID(UserID);
  };

  /* If user declines the confirmation, reset */
  const reset = () => {
    setConfirmModal(false);
    setSelectedUserID(null);
  };

  /* If user accepts the confirmation, remove user */
  const handleKick = () => {
    setConfirmModal(false);
    dispatch(removeGroupMember(GroupID, selectedUserID));
  };

  /*     Move back to modal menu     */
  const changeModal = () => {
    dispatch(setModalPage("GroupMenu"));
  };

  useEffect(() => {
    async function getMembers() {
      await dispatch(getGroupMembers(GroupID));
    }
    getMembers();
  }, []);
  return (
    <>
      <div
        className="MainMemberModal"
        style={{ display: confirmModal ? "none" : "block" }}
      >
        <div className="EditMemberHeader">
          <div>
            <IoArrowBack
              onClick={() => changeModal()}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>Manage Members</div>
          <div></div>
        </div>
        <div className="body">
          <h1>Members</h1>
          <div className="ModalHeaderItem">
            <div className="NameHeader">Name</div>
            <div className="RoleHeader">Role</div>
            <div className="IconHeader">Action</div>
          </div>
          <div className="ModalMemberContainer">
            {GroupMembers &&
              GroupMembers.map((Member, index) => (
                <div key={index} className="ModalMemberItem">
                  <div className="MemberName">{Member.name}</div>
                  <div className="MemberRole">{Member.role}</div>
                  <div className="MemberModalActionButtons">
                    {Member.role !== "Admin" && (
                      <IoBan
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => confirmKick(Member.id)}
                      />
                    )}
                    {Member.role === "Admin" && <IoStar />}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div
        className="ConfirmationModal"
        style={{ display: confirmModal ? "block" : "none" }}
      >
        <div className="ConfirmBody" style={{ marginTop: "30%" }}>
          <div>Are you sure you want to delete this user?</div>
          <button
            onClick={() => {
              reset();
            }}
            style={{
              backgroundColor: "red",
              borderRadius: 15,
              padding: "1%",
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          >
            NO
          </button>
          <button
            onClick={() => handleKick()}
            style={{
              backgroundColor: "green",
              borderRadius: 15,
              padding: "1%",
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          >
            YES
          </button>
        </div>
      </div>
    </>
  );
};
