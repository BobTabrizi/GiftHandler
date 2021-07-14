import React, { useEffect, useState } from "react";
import "../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/Navigation/NavBar";
import { GroupList } from "../components/Groups/GroupList";
import { RegistryList } from "../components/Items/RegistryList";
import { AddItemModal } from "../components/Items/AddItemModal";
import { EditItemModal } from "../components/Items/EditItemModal";
import { getItems } from "../actions/itemActions";
export const Dashboard = () => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.name);
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
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
        {showEditModal && <EditItemModal />}
        <div className="registryContainer">
          <RegistryList />
        </div>
      </div>
    </>
  );
};
