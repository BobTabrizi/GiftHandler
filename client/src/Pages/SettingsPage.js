import React, { useEffect, useState } from "react";
import "../styles/PageStyles/SettingsPage.css";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { loadUser, updateUser } from "../actions/authActions";
import { addImage } from "../actions/imageActions";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import axios from "axios";
/**
 *
 * @Page Settings Page
 * @Description Account Management for the user.
 *              Profile Image / Email / Password
 * @route /settings
 *
 */
export const SettingsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);
  useEffect(() => {
    async function getData() {
      let UID = await dispatch(loadUser());
    }
    getData();
  }, []);

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

  return (
    <>
      <div className="SettingsContainer">
        <NavBar title={"Settings"} />

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
            <div className="UserInfo">
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
