import React, { useEffect } from "react";
import "../styles/PageStyles/Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import { getGroups } from "../actions/groupActions";
import NavBar from "../components/Navigation/NavBar";
import { GroupComponent } from "../components/Groups/GroupComponent";
import { RegistryList } from "../components/Items/RegistryList";
import { AddItemModal } from "../components/Modals/AddItemModal";
import { EditItemModal } from "../components/Modals/EditItemModal";
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
  const GroupID = useSelector((state) => state.group.currentGroup.Group.id);
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);
  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
      dispatch(getGroups(UID));
    }
    getData();
  }, []);

  return (
    <>
      <div
        className="dashContainer"
        style={{
          position: !GroupID ? "absolute" : "static",
        }}
      >
        {ActiveModal === "AddItem" && <AddItemModal />}
        {showEditModal && <EditItemModal />}
        <NavBar title="HomePage" />
        <GroupComponent />

        <div
          className="registryPlaceholder"
          style={{ display: !GroupID ? "block" : "none" }}
        >
          <div>{GroupID ? `Your Wishlist` : `No Group Selected`}</div>
        </div>

        <div
          className="registryDashContainer"
          style={{ display: GroupID ? "block" : "none" }}
        >
          {GroupID && <RegistryList PageType={"Dashboard"} />}
        </div>
      </div>
    </>
  );
};
