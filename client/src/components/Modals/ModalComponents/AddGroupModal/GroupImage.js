import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage } from "../../../../actions/imageActions";
import "../../../../styles/GroupStyles/GroupModals.css";
import {
  setModalPage,
  updateModalData,
} from "../../../../actions/modalActions";
/**
 *
 * @PageLocation Home Page
 * @Component GroupImage
 * @Description Modal Component during group creation.
 *              Prompts user for an image to be displayed on group/event page.
 *
 */
export const GroupImage = () => {
  const id = useSelector((state) => state.auth.user.id);
  const GroupType = useSelector((state) => state.modal.modalData.GroupType);
  const [previewImage, setPreviewImage] = useState(
    `/api/images/DefaultGroupImage`
  );
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  /*  Upon File Input, set file state and display a preview image  */
  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  /*      Save image to S3             */
  const postImage = async ({ image }) => {
    let formData = new FormData();
    formData.append("image", image);
    const result = await dispatch(addImage(formData));
    return result;
  };

  const handleSubmit = async () => {
    let imageKey = "DefaultGroupImage";
    if (file) {
      const imageInfo = await postImage({ image: file });
      imageKey = imageInfo.Key;
    }

    let ModalData = {
      GroupType: GroupType,
      GroupImage: imageKey,
    };
    dispatch(updateModalData(ModalData));
    dispatch(setModalPage("EventInfo"));
  };
  return (
    <>
      <div className="GroupRegisterHeader">
        <h1>Group Image</h1>
      </div>
      <div className="GroupRegisterBody">
        <p>Upload a cover image</p>
        <input
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          onChange={fileSelected}
          accept="image/*"
        ></input>
        <label htmlFor="imageUpload" className="NewGroupImageBtn">
          <div className="ImageContainer">
            <div className="content" id="NewGroupImage">
              <div className="content-overlay"></div>
              <img
                className="content-image"
                src={previewImage}
                style={{ width: "100%", height: "100%", display: "block" }}
                alt="Registry Item"
              ></img>
              <div className="content-details fadeIn-top">
                <h3>Choose a new photo</h3>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="GroupRegisterFooter">
        <button className="GroupRegisterBtn" onClick={() => handleSubmit()}>
          {" "}
          Confirm
        </button>
      </div>
    </>
  );
};
