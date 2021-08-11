import React, { useEffect, useState } from "react";
import "../styles/PageStyles/SpecialGroupPage.css";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { RegistryList } from "../components/Items/RegistryList";
import { getItems } from "../actions/itemActions";
import { getPublicUser } from "../actions/authActions";
import { getGroup } from "../actions/groupActions";
import { FilterOtherUsers } from "../components/Filters/FilterOtherUsers";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { AddItemModal } from "../components/Modals/AddItemModal";
import { EditItemModal } from "../components/Modals/EditItemModal";
import { UserChecker } from "../components/Auth/UserChecker";
/**
 *
 * @Page Special Group Page
 * @Description Item page for a special group (Wedding/Birthday/etc)
 * @route /groups/:GID/event/users/:UID
 *
 */
export const SpecialGroupPage = (props) => {
  const [userName, setUserName] = useState("");
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const AuthInfo = useSelector((state) => state.auth);
  const PageInfo = useSelector((state) => state.group.pageGroup);
  const [image, setImage] = useState("DefaultProfileImage");
  const [canEdit, setCanEdit] = useState(false);
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
        setCanEdit(true);
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="EventPageContainer">
        {ActiveModal === "Confirm" && <ConfirmationModal />}
        {ActiveModal === "AddItem" && <AddItemModal />}
        {showEditModal && ActiveModal !== "Confirm" && <EditItemModal />}
        {AuthInfo.token && <NavBar title="Event Page" />}
        <div className="EventPageBody">
          <FilterOtherUsers />
          <div className="RegistryWrapper">
            <div className="EventHeader">
              <div className="EventUserInfo">
                <div className="EventUserName">{userName}</div>
                <div className="EventUserImage">
                  <img
                    height="100%"
                    width="100%"
                    src={`/api/images/${image}`}
                    style={{ borderRadius: "50%" }}
                  ></img>
                </div>
              </div>

              {PageInfo.name && (
                <div className="EventName">{PageInfo.name}</div>
              )}
              {PageInfo.Bio && <>{PageInfo.Bio.description}</>}
            </div>
            <div className="EventRegistryList">
              <RegistryList CanEdit={canEdit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
