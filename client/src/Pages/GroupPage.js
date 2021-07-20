import React, { useEffect, useState } from "react";
import "../styles/PageStyles/GroupPage.css";
import { useDispatch } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { getGroup } from "../actions/groupActions";
import { UserList } from "../components/Groups/UserList";

/**
 *
 * @Page Group Page
 * @Description Information about the group and all its members
 * @route /groups/:id
 *
 */
export const GroupPage = (props) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    async function getData() {
      let PageInfo = await dispatch(getGroup(props.match.params.id));
      setGroupName(PageInfo.name);
    }
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <NavBar title={groupName} />
        <div className="MemberContainer">
          <h1>Members in this group</h1>
          <UserList />
        </div>
      </div>
    </>
  );
};
