import React, { useEffect, useState } from "react";
import "../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { Header } from "../components/Header";
import { GroupModal } from "../components/GroupModal";
export const Dashboard = (props) => {
  const [showGroupJoin, setShowGroupJoin] = useState(false);
  const [showGroupCreate, setShowGroupCreate] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.name);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  console.log(useSelector((state) => state));

  return (
    <>
      <Header />
      <div className="dashContainer">
        <div className="dashGreeting">Hi {name},</div>
        <button
          className="groupIdentifier"
          onClick={() => setShowGroupCreate(true)}
        >
          CREATE A GROUP
        </button>
        <button
          className="groupIdentifier"
          onClick={() => setShowGroupJoin(true)}
        >
          JOIN A GROUP
        </button>
        {showGroupCreate && (
          <GroupModal closeModal={setShowGroupCreate} modalType={"Create"} />
        )}
        {showGroupJoin && (
          <GroupModal closeModal={setShowGroupJoin} modalType={"Join"} />
        )}
        <div style={{ textAlign: "center", fontSize: 36 }}>Your Registry</div>
        <div className="registryContainer"></div>
      </div>
    </>
  );
};
