import React, { useState, useEffect } from "react";
import "../../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { getGroupMembers } from "../../actions/groupActions";
import { Link } from "react-router-dom";
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
  let groupComponent = null;

  if (groups.length === 0) {
    groupComponent = (
      <>
        <div style={{ backgroundColor: "green" }}>
          You are Currently not in any Groups.
        </div>
      </>
    );
  } else {
    groupComponent = (
      <>
        Current Group:
        <Link
          to={`groups/${selectedGroup.value}`}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <button
            className="ActiveGroupBtn"
            onClick={() => console.log("hello")}
          >
            {groups[0].groupname}
          </button>
        </Link>
      </>
    );
  }

  useEffect(() => {
    let parsedGroups = [];
    if (groups.length !== 0) {
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
      groupComponent = (
        <>
          <div style={{ backgroundColor: "green" }}>
            You are Currently not in any Groups.
          </div>
        </>
      );

      if (parsedGroups[0].value !== -1) {
        getMembers(parsedGroups[0].value);
      }
    }
  }, [groups]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="ActiveGroupHeader">{groupComponent}</div>
      </div>
    </>
  );
};
