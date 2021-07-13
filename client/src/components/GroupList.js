import React, { useState, useEffect } from "react";
import "../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { getGroupMembers } from "../actions/groupActions";
export const GroupList = ({}) => {
  const [displayGroups, setDisplayGroups] = useState({
    value: -1,
    label: "Placeholder",
  });
  const [selectedGroup, setSelectedGroup] = useState(displayGroups);
  const [groupMembers, setGroupMembers] = useState(null);
  const groups = useSelector((state) => state.group.groups);
  const groupMem = useSelector((state) => state.group.groupMembers);
  const dispatch = useDispatch();

  useEffect(() => {
    let parsedGroups = [];
    for (let i = 0; i < groups.length; i++) {
      parsedGroups.push({ value: groups[i].id, label: groups[i].groupname });
    }
    setDisplayGroups(parsedGroups);
    setSelectedGroup(parsedGroups[0]);
    async function getMembers(groupID) {
      let members;
      members = await dispatch(getGroupMembers(groupID));
      console.log(members);
      setGroupMembers(members);
    }

    console.log(parsedGroups[0].value);
    if (parsedGroups[0].value !== -1) {
      getMembers(parsedGroups[0].value);
    }
  }, [groups]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        Current Group: {groups[0].groupname}
      </div>
      <div style={{ textAlign: "center" }}>Group Members: </div>
      <div style={{ textAlign: "center" }}>
        {groupMembers &&
          groupMembers.map((member, index) => <div>{member.name}</div>)}
      </div>
    </>
  );
};
