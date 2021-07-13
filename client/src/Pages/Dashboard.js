import React, { useEffect, useState } from "react";
import "../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import { Header } from "../components/Header";
import { GroupModal } from "../components/GroupModal";
import { GroupList } from "../components/GroupList";
export const Dashboard = (props) => {
  const [showGroupJoin, setShowGroupJoin] = useState(false);
  const [showGroupCreate, setShowGroupCreate] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.name);
  const id = useSelector((state) => state.auth.user.id);
  const groups = useSelector((state) => state.group);

  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
      dispatch(getGroups(UID));
    }
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="dashContainer">
        <div className="dashGreeting">Hi {name},</div>
        <GroupList />
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
        <div style={{ textAlign: "center", fontSize: 36 }}>
          Your Registry List
        </div>
        <div className="registryContainer"></div>
      </div>
    </>
  );
};
