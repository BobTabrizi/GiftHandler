/**
 *
 * @Page EventPage
 * @Description Item page for a special group (Wedding/Birthday/etc)
 * @route /groups/:GID/event/users/:UID
 *
 */

import React, { useEffect, useState } from "react";
import "../styles/PageStyles/EventPage.css";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { RegistryList } from "../components/Items/RegistryList";
import { getItems } from "../actions/itemActions";
import { getPublicUser } from "../actions/authActions";
import { getGroup } from "../actions/groupActions";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { AddItemModal } from "../components/Modals/ItemModals/AddItemModal";
import { EditItemModal } from "../components/Modals/ItemModals/EditItemModal";
import { ViewItemModal } from "../components/Modals/ItemModals/ViewItemModal";
import { UserChecker } from "../components/Auth/UserChecker";
import { GroupInfoWrapper } from "../components/Groups/GroupInfoWrapper";
import { EventPageHeader } from "../components/Groups/EventPageHeader";

export const SpecialGroupPage = (props) => {
  const [userName, setUserName] = useState("");
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const AuthInfo = useSelector((state) => state.auth);
  const [image, setImage] = useState("DefaultProfileImage");
  const [canEditPage, setCanEditPage] = useState(false);
  const dispatch = useDispatch();
  const UID = props.match.params.UID;
  const GID = props.match.params.GID;

  useEffect(() => {
    async function getData() {
      let userInfo = await dispatch(getPublicUser(UID));
      setUserName(userInfo[0].name);
      setImage(userInfo[0].profileimage);
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
      <div className="EventPageContainer">
        {ActiveModal === "Confirm" && <ConfirmationModal />}
        {ActiveModal === "AddItem" && <AddItemModal />}
        {ActiveModal === "ViewItem" && <ViewItemModal />}
        {showEditModal && ActiveModal !== "Confirm" && <EditItemModal />}
        {AuthInfo.token && <NavBar title="Event Page" />}
        <div className="EventPageBody">
          <div className="RegistryWrapper">
            <EventPageHeader image={image} userName={userName} />
            <GroupInfoWrapper canEditPage={canEditPage} />
            <div className="EventRegistryList">
              <RegistryList CanEdit={canEditPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
