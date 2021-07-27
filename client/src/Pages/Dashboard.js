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
import { FilterColumn } from "../components/Filters/FilterColumn";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { clearItems } from "../actions/itemActions";
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
  const NumItems = useSelector((state) => state.item.memberItems);
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);
  useEffect(() => {
    dispatch(clearItems());
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
          position:
            !GroupID || (NumItems && NumItems.length < 4)
              ? "absolute"
              : "static",
        }}
      >
        {ActiveModal === "Confirm" && <ConfirmationModal />}
        {ActiveModal === "AddItem" && <AddItemModal />}
        {showEditModal && ActiveModal !== "Confirm" && <EditItemModal />}
        <NavBar title="HomePage" />

        <div className="DashBody">
          <FilterColumn />
          <div className="registryBody">
            <div
              className="registryPlaceholder"
              style={{ display: !GroupID ? "block" : "none" }}
            >
              <div>{GroupID ? `Your Wishlist` : <GroupComponent />} </div>
            </div>

            <div
              className="registryDashContainer"
              style={{ display: GroupID ? "block" : "none" }}
            >
              {GroupID && <RegistryList PageType={"Dashboard"} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
