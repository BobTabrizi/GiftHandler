import React, { useEffect, useState } from "react";
import "../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/NavBar";
import { GroupList } from "../components/GroupList";
import { RegistryList } from "../components/RegistryItem";
import { AddItemModal } from "../components/AddItemModal";
import { getItems } from "../actions/itemActions";
export const Dashboard = (props) => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.name);
  const id = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
      dispatch(getGroups(UID));
      let itemResponse = await dispatch(getItems(UID));
      setItems(itemResponse);
    }
    getData();
  }, []);

  return (
    <>
      <NavBar title="HomePage" />
      <div className="dashContainer">
        <div className="dashGreeting">Hi {name},</div>
        <GroupList />
        <div style={{ textAlign: "center", fontSize: 36 }}>
          Your Registry List
          <button className="AddItemBtn" onClick={() => setShowItemModal(true)}>
            ADD ITEM
          </button>
        </div>
        {showItemModal && <AddItemModal closeModal={setShowItemModal} />}
        <div className="registryContainer">
          <RegistryList />
        </div>
      </div>
    </>
  );
};
