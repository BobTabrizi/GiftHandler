import React, { useRef, useEffect } from "react";
import "../styles/Login.css";
import { connect, useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/authActions";
import { Link } from "react-router-dom";
export const Dashboard = (props) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  console.log(useSelector((state) => state));

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div style={{ color: "black", backgroundColor: "green" }}>{email}</div>

      <Link to="/login" onClick={handleLogout} style={{ cursor: "pointer" }}>
        LOG OUT
      </Link>
    </>
  );
};
