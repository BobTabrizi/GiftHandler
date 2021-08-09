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
import { UserChecker } from "../components/Auth/UserChecker";

/**
 *
 * @Page User Group Page
 * @Description Item page for a user in a specified group,
 * @route /groups/:GID/users/:UID
 *
 */
export const UserGroupPage = (props) => {
  const [userName, setUserName] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [canEditPage, setCanEditPage] = useState(false);
  const UID = props.match.params.id;
  const GID = props.match.params.gid;
  const AuthInfo = useSelector((state) => state.auth);
  const PageInfo = useSelector((state) => state.group.pageGroup);
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
      let userInfo = await dispatch(getUser(UID));
      setUserName(userInfo[0].name);
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
          <div className="UserRegistryWrap">
            <div className="UserPageHeader">
              <div className="UserInfo">
                {PageInfo.name && (
                  <div className="UserInfoName">{PageInfo.name}</div>
                )}

                <div className="Avatars">
                  {PageInfo.members &&
                    PageInfo.members.length < 3 &&
                    PageInfo.members.map((member, index) => (
                      <>
                        <span className="Avatar" key={index}>
                          <a
                            onClick={() => {
                              window.location.href = `/groups/${GID}/users/${member.id}`;
                            }}
                          >
                            <img
                              height="65px"
                              width="70px"
                              src={`/api/images/${member.profileimage}`}
                              alt="User Avatar"
                              title={member.name}
                            ></img>
                          </a>
                        </span>
                      </>
                    ))}
                  {PageInfo.members &&
                    PageInfo.members.length > 3 &&
                    PageInfo.members.map((member, index) => {
                      if (index > PageInfo.members.length - 4) {
                        return (
                          <>
                            <span className="Avatar" key={index}>
                              <a
                                onClick={() => {
                                  window.location.href = `/groups/${GID}/users/${member.id}`;
                                }}
                              >
                                <img
                                  className="AvatarImage"
                                  height="65px"
                                  width="70px"
                                  title={member.name}
                                  src={`/api/images/${member.profileimage}`}
                                ></img>
                              </a>
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
                              key={index}
                              title="More Users"
                            >
                              <div className="ExtraLabel">
                                {PageInfo.members.length - 3}
                              </div>
                            </span>
                          </>
                        );
                      }
                    })}
                  <div
                    className="MemberList"
                    style={{ display: showMembers ? "block" : "none" }}
                  >
                    Members In this Group
                    <hr />
                    {PageInfo.members &&
                      PageInfo.members.map((member, index) => (
                        <a
                          onClick={() => {
                            window.location.href = `/groups/${GID}/users/${member.id}`;
                          }}
                        >
                          <div className="UserMemberContainer" key={index}>
                            <div style={{ flex: 1 }}>
                              <img
                                className="AvatarImage"
                                height="35px"
                                width="40px"
                                title={member.name}
                                style={{ borderRadius: "50%" }}
                                src={`/api/images/${member.profileimage}`}
                              ></img>
                            </div>
                            <div style={{ flex: 5 }}>{member.name}</div>
                          </div>
                        </a>
                      ))}
                  </div>
                  <div className="UserInfoName">{userName}</div>
                </div>
              </div>
            </div>

            <div className="registryContainer">
              <RegistryList PageType={"Dashboard"} CanEdit={canEditPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
