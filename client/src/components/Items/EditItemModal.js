import React, { useState } from "react";
import "../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../actions/itemActions";
import { addImage, deleteImage } from "../../actions/imageActions";
import CurrencyInput from "../CurrencyInput";
import { unSelectEditItem } from "../../actions/itemActions";

/**
 *
 * @PageLocation Dashboard
 * @Component EditItemModal
 * @Description Modal that allows a user to edit attributes of an item
 *
 */
export const EditItemModal = () => {
  const id = useSelector((state) => state.auth.user.id);
  const item = useSelector((state) => state.item.selectedItem.itemDetails);
  const [itemprice, setItemPrice] = useState(item.price);
  const [itemname, setItemName] = useState(item.name);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    `http://localhost:3005/api/images/${item.image}`
  );
  const dispatch = useDispatch();

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const postImage = async ({ image }) => {
    //First delete the old image if its not the default
    if (item.image !== "DefaultItem") {
      dispatch(deleteImage(item.image));
    }

    //Then add the new image
    let formData = new FormData();
    formData.append("image", image);
    const result = await dispatch(addImage(formData));
    return result;
  };

  const handleModalClose = () => {
    dispatch(unSelectEditItem());
  };
  const handleSubmit = async () => {
    let imageKey = item.image;

    //If the image was changed, delete and update images in S3
    if (file) {
      const imageInfo = await postImage({ image: file });
      imageKey = imageInfo.Key;
    }
    // Then update the item in DB
    let itemObject = {
      itemid: item.itemid,
      price: itemprice,
      imageKey: imageKey,
      name: itemname,
    };
    dispatch(editItem(itemObject));
    //Exit Modal
    dispatch(unSelectEditItem());
  };

  return (
    <>
      <div className="itemModalBackground">
        <div className="modalContainer">
          <div className="modalHeader">
            <div className="modalCloseButton">
              <button
                onClick={() => handleModalClose()}
                style={{ fontSize: 22 }}
              >
                X
              </button>
            </div>
            Edit Item
          </div>
          <div className="body">
            <div>
              Item Name
              <input
                className="modalInput"
                placeholder={`${item.name}`}
                onChange={(e) => setItemName(e.target.value)}
              ></input>
            </div>
            <div style={{ marginTop: 15 }}>
              Item Price
              <CurrencyInput
                className="modalInput"
                placeholder={`${item.price}`}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <input
                type="file"
                id="imgUpload"
                style={{ display: "none" }}
                onChange={fileSelected}
                accept="image/*"
              ></input>
              <label htmlFor="imgUpload" className="ImageUploadBtn">
                Upload a new image
              </label>
            </div>
            <img
              src={previewImage}
              height={150}
              width={150}
              alt="Preview"
            ></img>
          </div>
          <div className="footer">
            <div className="modalCreateButton">
              <button
                style={{ fontSize: 22, cursor: "pointer" }}
                onClick={() => handleSubmit()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
