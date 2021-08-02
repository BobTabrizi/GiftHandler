import React, { useEffect, useState } from "react";
import "../styles/PageStyles/ProfilePage.css";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { loadUser, updateUser } from "../actions/authActions";
import { addImage } from "../actions/imageActions";
import { GroupList } from "../components/Groups/GroupList";
import { getGroups } from "../actions/groupActions";
import { CreateJoinGroup } from "../components/Groups/CreateJoinGroup";
import { EditGroupModal } from "../components/Modals/EditGroupModal";
import { AddJoinGroupModal } from "../components/Modals/AddJoinGroupModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { clearPageGroup } from "../actions/groupActions";
/**
 *
 * @Page Profile Page
 * @Description Account Management for the user.
 *              Profile Image / Email / Password (TODO)
 * @route /profile
 *
 */
export const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const groups = useSelector((state) => state.group.groups);
  const dispatch = useDispatch();
  const ShowEditGroupModal = useSelector(
    (state) => state.group.selectedGroup.displayEditGroupModal
  );
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);

  const fileSelected = async (e) => {
    const file = e.target.files[0];
    const imageInfo = await postImage({ image: file });
    let imageKey = imageInfo.Key;
    let userObject = {
      id: user.id,
      name: user.name,
      profileImage: imageKey,
    };

    dispatch(updateUser(userObject));
  };

  const postImage = async ({ image }) => {
    let formData = new FormData();
    formData.append("image", image);
    const result = await dispatch(addImage(formData));
    return result;
  };

  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
      dispatch(getGroups(UID));
      dispatch(clearPageGroup());
    }
    getData();
  }, []);

  return (
    <>
      <div
        className="ProfileContainer"
        style={{
          position: groups && groups.length === 0 ? "absolute" : "static",
        }}
      >
        {ShowEditGroupModal && <EditGroupModal />}
        {ActiveModal === "Group" && <AddJoinGroupModal />}
        {ActiveModal === "Confirm" && <ConfirmationModal />}
        <NavBar />

        {user.profileimage && (
          <div className="ProfileInfo">
            <br />
            <div>
              <img
                src={`/api/images/${user.profileimage}`}
                width={150}
                height={150}
                style={{ borderRadius: "50%" }}
              ></img>
              <div className="HomePageProfileImg">
                <input
                  type="file"
                  id="imgUpload"
                  style={{ display: "none" }}
                  onChange={fileSelected}
                  accept="image/*"
                ></input>
                <label htmlFor="imgUpload" className="ChangeProfileImgBtn">
                  +
                </label>
              </div>
            </div>
            <div className="UserInfo">{user.name}</div>
          </div>
        )}

        <CreateJoinGroup />

        <div
          className="registryPlaceholder"
          style={{ display: groups && groups.length === 0 ? "block" : "none" }}
        >
          <div>Join or Create a Group to Begin!</div>
        </div>

        <GroupList />
      </div>
    </>
  );
};
