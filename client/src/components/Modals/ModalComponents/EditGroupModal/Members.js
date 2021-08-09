import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { getGroupMembers } from "../../../../actions/groupActions";
import { setModalPage } from "../../../../actions/modalActions";
import { removeGroupMember } from "../../../../actions/groupActions";
import { IoBan } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { assignPartners } from "../../../../actions/groupActions";
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
  const [adminIsPartner, setAdminIsPartner] = useState(false);
  const GroupDetails = useSelector(
    (state) => state.group.selectedGroup.groupDetails
  );
  const GroupMembers = useSelector(
    (state) => state.group.selectedGroup.groupMembers
  );
  const dispatch = useDispatch();

  const assign = () => {
    let PartnerList = [];
    let idx = 0;
    let PartnerMap = [];
    if (!adminIsPartner) {
      idx = 1;
      PartnerMap.push([GroupMembers[0].id, -1]);
    }
    //put all ids in an array
    for (let i = idx; i < GroupMembers.length; i++) {
      PartnerList.push(GroupMembers[i].id);
    }

    //Randomly assign unique sets of partners
    while (PartnerList.length >= 2) {
      let r1 = Math.random() * PartnerList.length;
      let person1 = PartnerList.splice(r1, 1)[0];

      let r2 = Math.random() * PartnerList.length;
      let person2 = PartnerList.splice(r2, 1)[0];
      PartnerMap.push([person1, person2]);
    }

    let GroupParams;
    for (let i = 0; i < PartnerMap.length; i++) {
      GroupParams = {
        PartnerList: PartnerMap[i],
        GroupID: GroupDetails.groupid,
      };

      dispatch(assignPartners(GroupParams));
    }
  };

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
    dispatch(removeGroupMember(GroupDetails.groupid, selectedUserID));
  };

  useEffect(() => {
    async function getMembers() {
      await dispatch(getGroupMembers(GroupDetails.groupid));
    }
    getMembers();
  }, []);
  return (
    <>
      <div
        className="MainMemberModal"
        style={{ display: confirmModal ? "none" : "block" }}
      >
        <div className="body">
          <h1>Members</h1>
          <div className="MemberModalHeaderItem">
            <div className="NameHeader">Name</div>
            <div className="RoleHeader">Role</div>
            <div className="PartnerHeader">Partner</div>
            <div className="IconHeader">Action</div>
          </div>
          <div className="MemberModalContainer">
            {GroupMembers &&
              GroupMembers.map((Member, index) => (
                <div key={index} className="MemberItem">
                  <div className="MemberName">{Member.name}</div>
                  <div className="MemberRole">{Member.role}</div>
                  <div className="PartnerName">{Member.partner}</div>
                  <div className="MemberActionBtns">
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
          {GroupMembers && (
            <>
              <div>
                <button
                  className="AssignPartnerBtn"
                  onClick={() => assign()}
                  disabled={
                    GroupMembers.length < 2 ||
                    (GroupMembers.length % 2 === 1 &&
                      adminIsPartner === true) ||
                    (GroupMembers.length === 2 && adminIsPartner === false)
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor:
                      GroupMembers.length < 2 ||
                      (GroupMembers.length % 2 === 1 &&
                        adminIsPartner === true) ||
                      (GroupMembers.length === 2 && adminIsPartner === false)
                        ? "gray"
                        : "dodgerblue",
                  }}
                >
                  Assign Partners
                </button>
              </div>
              <input
                className="AdminPartnerBtn"
                type="checkbox"
                disabled={GroupMembers.length % 2 === 0 ? false : true}
                checked={adminIsPartner}
                onChange={() => setAdminIsPartner(!adminIsPartner)}
              ></input>
              Assign Admin (you) to a partner
            </>
          )}
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
