import React, { useEffect, useState } from "react";
import "../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/Navigation/NavBar";
import { RegistryList } from "../components/Items/RegistryList";
import { getItems } from "../actions/itemActions";
export const UserPage = (props) => {
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  const UID = props.match.params.id;

  useEffect(() => {
    async function getData() {
      let itemResponse = await dispatch(getItems(UID));
      setItems(itemResponse);
    }
    getData();
  }, []);

  return (
    <>
      <NavBar title="User Page" />
      <div className="dashContainer">
        <div className="registryContainer">
          <RegistryList />
        </div>
      </div>
    </>
  );
};
