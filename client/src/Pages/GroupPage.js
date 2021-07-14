import React, { useEffect, useState } from "react";
import "../styles/GroupPage.css";
import { useDispatch } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { getGroup } from "../actions/groupActions";
import { UserList } from "../components/UserList";
export const GroupPage = (props) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [members, setGroupMembers] = useState(null);

  useEffect(() => {
    async function getData() {
      let PageInfo = await dispatch(getGroup(props.match.params.id));
      setGroupName(PageInfo.name);
      setGroupMembers(PageInfo.members);
    }
    getData();
  }, []);

  return (
    <>
      <NavBar title={groupName} />

      <div className="container">
        <div className="memberContainer">
          Members in this group:
          <UserList />
        </div>
      </div>
    </>
  );
};
