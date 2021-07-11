import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/authActions";
import { Link } from "react-router-dom";
export const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="headerContainer">
        <div className="headerTitle">Gift Handler</div>
        <div className="logButton">
          <Link
            to="/login"
            onClick={handleLogout}
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            LOG OUT
          </Link>
        </div>
      </div>
    </>
  );
};
