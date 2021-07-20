import React, { useEffect, useState } from "react";
import "../styles/PageStyles/ProfilePage.css";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { loadUser, updateUser } from "../actions/authActions";
import { addImage } from "../actions/imageActions";

/**
 *
 * @Page Profile Page
 * @Description Account Management for the user.
 *              Profile Image / Email / Password (TODO)
 * @route /profile
 *
 */
export const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
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
      dispatch(loadUser());
    }
    getData();
  }, []);

  return (
    <>
      <div className="ProfileContainer">
        <NavBar title="Profile Page" />

        {user.profileimage && (
          <div className="ProfileInfo">
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <br />
            <img
              src={`http://localhost:3005/api/images/${user.profileimage}`}
              width={150}
              height={150}
              style={{ borderRadius: 15 }}
            ></img>
            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <input
                type="file"
                id="imgUpload"
                style={{ display: "none" }}
                onChange={fileSelected}
                accept="image/*"
              ></input>
              <label htmlFor="imgUpload" className="ProfileImgBtn">
                Upload a new image
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
