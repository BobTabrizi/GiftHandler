import React, { useEffect, useState } from "react";
import "../styles/PageStyles/GroupPage.css";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { RegistryList } from "../components/Items/RegistryList";
import { getItems } from "../actions/itemActions";
import { getGroup } from "../actions/groupActions";
import { AddItemModal } from "../components/Modals/ItemModals/AddItemModal";
import { EditItemModal } from "../components/Modals/ItemModals/EditItemModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { UserChecker } from "../components/Auth/UserChecker";
import { GroupPageHeader } from "../components/Groups/GroupPageHeader";
import { GroupInfoWrapper } from "../components/Groups/GroupInfoWrapper";
/**
 *
 * @Page User Group Page
 * @Description Item page for a user in a specified group,
 * @route /groups/:GID/users/:UID
 *
 */
export const UserGroupPage = (props) => {
  const [canEditPage, setCanEditPage] = useState(false);
  const UID = props.match.params.id;
  const GID = props.match.params.gid;
  const AuthInfo = useSelector((state) => state.auth);
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);

  //Selector to filter out the page owner from the members listed in their group.
  //The list is reversed for visual purposes, making the page owner the first in the list
  useSelector((state) => {
    if (state.group.pageGroup.length !== 0) {
      let idx = state.group.pageGroup.members.findIndex(
        (member) => member.id == UID
      );
      let temp = state.group.pageGroup.members[0];
      state.group.pageGroup.members[0] = state.group.pageGroup.members[idx];
      state.group.pageGroup.members[idx] = temp;
      state.group.pageGroup.members.reverse();
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      await dispatch(getGroup(GID));
      await dispatch(getItems(UID, GID));
      //Check to see if the visitor is authenticated
      let User = UserChecker(AuthInfo.token);
      //If they are authenticated and own the page, give edit permissions
      if (User && User.id == UID) {
        setCanEditPage(true);
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="UserPageContainer">
        {ActiveModal === "Confirm" && <ConfirmationModal />}
        {ActiveModal === "AddItem" && <AddItemModal />}
        {showEditModal && ActiveModal !== "Confirm" && <EditItemModal />}
        <NavBar title="User Page" />
        <div className="UserPageBody">
          <div className="UserRegistryWrap">
            <GroupPageHeader GID={GID} />
            <GroupInfoWrapper canEditPage={canEditPage} />
            <div className="registryContainer">
              <RegistryList CanEdit={canEditPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
