import React, { useEffect } from "react";
import "../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/Navigation/NavBar";
import { GroupComponent } from "../components/Groups/GroupComponent";
import { RegistryList } from "../components/Items/RegistryList";
import { AddItemModal } from "../components/Items/AddItemModal";
import { EditItemModal } from "../components/Items/EditItemModal";

/**
 *
 * @Page Dashboard
 * @Description Home page for the user. Add/View items based on the active group.
 *              If user is not in any groups, linked to Group Management page
 * @route /
 *
 */
export const Dashboard = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.name);
  const GroupID = useSelector((state) => state.group.currentGroup.Group.id);
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const showAddModal = useSelector(
    (state) => state.item.itemAddition.displayAddModal
  );
  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
      dispatch(getGroups(UID));
    }
    getData();
  }, []);

  return (
    <>
      <div className="dashContainer">
        {showAddModal && <AddItemModal />}
        {showEditModal && <EditItemModal />}
        <NavBar title="HomePage" />
        <div className="dashGreeting">Hi {name},</div>
        <GroupComponent />
        <div style={{ textAlign: "center", fontSize: 36 }}>
          Your Registry List
        </div>

        <div className="registryContainer">
          {GroupID && <RegistryList PageType={"Dashboard"} />}
        </div>
      </div>
    </>
  );
};
