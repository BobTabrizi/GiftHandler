import React from "react";
import { useSelector } from "react-redux";
import "../../styles/ManageGroup.css";
import { Link } from "react-router-dom";

/**
 * @PageLocation ManageGroup
 * @Component GroupList
 * @Description Array of groups that link to respective group pages
 *
 */
export const GroupList = () => {
  const groups = useSelector((state) => state.group.groups);
  return (
    <>
      <div className="GroupListContainer">
        {groups &&
          groups.map((group, index) => (
            <div key={index}>
              <Link
                to={`/groups/${group.id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="GroupContainer">{group.groupname}</div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
