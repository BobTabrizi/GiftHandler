import React, { useEffect } from "react";
import "../styles/ManageGroup.css";
import { useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/Navigation/NavBar";
import { GroupList } from "../components/Groups/GroupList";
import { CreateJoinGroup } from "../components/Groups/CreateJoinGroup";

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
        <NavBar title="Manage Groups" />
        <CreateJoinGroup />
        <div className="groupTypesContainer">
          <div className="ownedGroups">
            <h1>Owned Groups</h1>
            <GroupList />
          </div>
          <div className="otherGroups">
            <h1>Other Groups</h1>
            <GroupList />
          </div>
        </div>
      </div>
    </>
  );
};
