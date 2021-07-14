import React from "react";
import { useSelector } from "react-redux";
import "../styles/GroupPage.css";
import { Link } from "react-router-dom";
export const UserList = () => {
  const members = useSelector((state) => state.group.pageGroup.members);
  return (
    <>
      <div className="UserListContainer">
        {members &&
          members.map((member, index) => (
            <div className="UserContainer" key={index}>
              <Link
                to={`/users/${member.id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="UserName">{member.name}</div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
