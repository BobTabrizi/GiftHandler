import React, { useEffect, useState } from "react";
import "../styles/GroupPage.css";
import { useDispatch } from "react-redux";
import { Header } from "../components/Header";
import { getGroup } from "../actions/groupActions";
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
      <Header />
      <div className="container">
        <div className="Header">
          <div className="GroupTitle">{groupName}</div>
        </div>
        <div className="Body">
          Members in this group:
          <div className="memberContainer">
            {members &&
              members.map((member, index) => (
                <div key={index}>{member.name}</div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
