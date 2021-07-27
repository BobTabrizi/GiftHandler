import React, { useEffect } from "react";
import "../styles/PageStyles/ManageGroup.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/Navigation/NavBar";
import { GroupList } from "../components/Groups/GroupList";
import { CreateJoinGroup } from "../components/Groups/CreateJoinGroup";
import { EditGroupModal } from "../components/Modals/EditGroupModal";
import { AddJoinGroupModal } from "../components/Modals/AddJoinGroupModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
/**
 *
 * @Page Group Manager Page
 * @Description View all groups that a user is currently in.
 *              Delete/Add owned groups by the user or join other groups.
 * @route /managegroups
 *
 */
export const ManageGroup = () => {
  const dispatch = useDispatch();
  const ShowEditGroupModal = useSelector(
    (state) => state.group.selectedGroup.displayEditGroupModal
  );
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);
  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
      dispatch(getGroups(UID));
    }
    getData();
  }, []);

  return (
    <>
      <div className="container">
        {ShowEditGroupModal && <EditGroupModal />}
        {ActiveModal === "Group" && <AddJoinGroupModal />}
        {ActiveModal === "Confirm" && <ConfirmationModal />}
        <NavBar title="Manage Groups" />
        <CreateJoinGroup />
        <div className="groupTypesContainer">
          <div className="ownedGroups">
            <h1>Owned Groups</h1>
            <GroupList FilterType={"Admin"} />
          </div>
          <div className="otherGroups">
            <h1>Other Groups</h1>
            <GroupList FilterType={"Member"} />
          </div>
        </div>
      </div>
    </>
  );
};
