import React, { useEffect, useState } from "react";
import "../styles/PageStyles/UserPage.css";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { RegistryList } from "../components/Items/RegistryList";
import { getItems } from "../actions/itemActions";
import { getUser } from "../actions/userActions";
import { getGroup } from "../actions/groupActions";
import { AddItemModal } from "../components/Modals/AddItemModal";
import { EditItemModal } from "../components/Modals/EditItemModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { FilterOtherUsers } from "../components/Filters/FilterOtherUsers";
import { FilterColumn } from "../components/Filters/FilterColumn";

/**
 *
 * @Page User Group Page
 * @Description Item page for a user in a specified group,
 * @route /groups/:GID/users/:UID
 *
 */
export const UserGroupPage = (props) => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("DefaultProfileImage");
  const [members, setMembers] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [canEditPage, setCanEditPage] = useState(false);
  const UID = props.match.params.id;
  const GID = props.match.params.gid;
  const AuthInfo = useSelector((state) => state.auth);
  const PageInfo = useSelector((state) => state.group.pageGroup);
  const PageMembers = useSelector((state) => {
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
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);

  const dispatch = useDispatch();

  function jwtDecode(t) {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split(".")[0]));
    token.payload = JSON.parse(window.atob(t.split(".")[1]));
    return token.payload.user;
  }

  useEffect(() => {
    async function getData() {
      let userInfo = await dispatch(getUser(UID));
      setUserName(userInfo[0].name);
      setImage(userInfo[0].profileimage);
      await dispatch(getGroup(GID));
      await dispatch(getItems(UID, GID));

      let user = jwtDecode(AuthInfo.token);
      if (user.id == UID) {
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
          {canEditPage && (
            <>
              <FilterColumn />
            </>
          )}
          {!canEditPage && (
            <>
              <FilterOtherUsers />
            </>
          )}
          <div className="RegistryWrapper">
            <div className="UserPageHeader">
              <div className="UserInfo">
                {PageInfo.name && (
                  <div className="UserInfoName">{PageInfo.name}</div>
                )}

                <div className="Avatars">
                  {PageInfo.members &&
                    PageInfo.members.length < 3 &&
                    PageInfo.members.map((member, index) => (
                      <span className="Avatar">
                        <img
                          height="65px"
                          width="70px"
                          src={`/api/images/${member.profileimage}`}
                        ></img>
                      </span>
                    ))}
                  {PageInfo.members &&
                    PageInfo.members.length > 3 &&
                    PageInfo.members.map((member, index) => {
                      if (index > PageInfo.members.length - 4) {
                        return (
                          <>
                            <span className="Avatar">
                              <img
                                height="65px"
                                width="70px"
                                src={`/api/images/${member.profileimage}`}
                              ></img>
                            </span>
                          </>
                        );
                      } else if (index === 0) {
                        return (
                          <>
                            <span
                              className="Avatar"
                              id="ExtraMembers"
                              onClick={() => setShowMembers(!showMembers)}
                            >
                              <div className="ExtraLabel">
                                {PageInfo.members.length - 3}
                              </div>
                            </span>
                          </>
                        );
                      }
                    })}
                  <div className="UserInfoName">{userName}</div>
                  <div
                    className="MemberList"
                    style={{ display: showMembers ? "block" : "none" }}
                  >
                    Members In this Group
                    <hr />
                    {PageInfo.members &&
                      PageInfo.members.map((member, index) => (
                        <div className="UserMemberContainer">{member.name}</div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="registryContainer">
              <RegistryList PageType={"Dashboard"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
