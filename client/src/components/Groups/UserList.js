/**
 *
 * @PageLocation GroupPage
 * @Component UserList
 * @Description Array of members within a specified group.
 *              Links to member pages with their respective registry items.
 *
 */

import React from "react";
import { useSelector } from "react-redux";
import "../../styles/PageStyles/GroupPage.css";
import { Link } from "react-router-dom";

export const UserList = () => {
  const members = useSelector((state) => state.group.pageGroup.members);
  const groupid = useSelector((state) => state.group.pageGroup.id);
  return (
    <>
      <div className="UserListContainer">
        {members &&
          members.map((member, index) => (
            <div className="UserContainer" key={index}>
              <Link
                to={`/groups/${groupid}/users/${member.id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="UserImage">
                  <img
                    src={`/api/images/${member.profileimage}`}
                    style={{ width: "100%", height: "100%", borderRadius: 25 }}
                  ></img>
                </div>
                <div className="UserName">{member.name}</div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
