import React, { useEffect, useState } from "react";
import "../styles/ManageGroup.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/NavBar";
import { GroupList } from "../components/GroupList";
import { CreateJoinGroup } from "../components/CreateJoinGroup";
export const ManageGroup = (props) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.name);
  const id = useSelector((state) => state.auth.user.id);
  const groups = useSelector((state) => state.group);

  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
      dispatch(getGroups(UID));
    }
    getData();
  }, []);

  return (
    <>
      <NavBar title="Manage Groups" />
      <div className="container">
        <CreateJoinGroup />
        <div className="Body">
          <div className="groupTypesContainer">
            <div className="ownedGroups">Owned Groups</div>
            <div className="usersGroups">Your Groups</div>
          </div>
        </div>
      </div>
    </>
  );
};
