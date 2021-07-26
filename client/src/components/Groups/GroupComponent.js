import React, { useEffect, useState } from "react";
import "../../styles/PageStyles/Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
/**
 *
 * @PageLocation Dashboard
 * @Component GroupComponent
 * @Description  Handles active group for the user
 *
 */
export const GroupComponent = () => {
  const groups = useSelector((state) => state.group.groups);
  return (
    <>
      {groups && groups.length === 0 && (
        <Link
          to={`/managegroups`}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div className="NullGroupPrompt">Join Or Create a Group!</div>
        </Link>
      )}
    </>
  );
};
