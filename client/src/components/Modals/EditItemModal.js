import React, { useState, useEffect } from "react";
import "../../styles/ItemStyles/ItemModals.css";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../actions/itemActions";
import { deleteItem } from "../../actions/itemActions";
import { addImage, deleteImage } from "../../actions/imageActions";
import CurrencyInput from "../Items/CurrencyInput";
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
  const DispModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const [itemprice, setItemPrice] = useState(item.price);
  const [itemname, setItemName] = useState(item.name);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [itemLink, setItemLink] = useState(item.link);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(`/api/images/${item.image}`);
  const dispatch = useDispatch();

  /*  Upon File Input, set file state and display a preview image  */
  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  /*  Add Event listener to close modal on background click      */
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target && e.target.className === "ItemModalBackground") {
        dispatch(unSelectEditItem());
      }
    };
    if (DispModal) {
      window.addEventListener("click", handleClick);
    }
  }, [DispModal]);

  /*      Delete old image and save new image to S3       */
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

  /*    Exit modal entirely     */
  const handleModalClose = () => {
    dispatch(unSelectEditItem());
  };

  /*  Handle Deletion of selected item */
  const handleDeleteItem = () => {
    dispatch(deleteItem(item.itemid, item.image));
    dispatch(unSelectEditItem());
  };

  /*   Handle Edit of the item */
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
      quantity: itemQuantity,
      link: itemLink,
      imageKey: imageKey,
      name: itemname,
    };
    dispatch(editItem(itemObject));
    //Exit Modal
    dispatch(unSelectEditItem());
  };

  return (
    <>
      <div className="ItemModalBackground">
        <div className="ItemModalContainer">
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={fileSelected}
            accept="image/*"
          ></input>
          <label htmlFor="imageUpload" className="NewImageBtn">
            <div className="ImageContainer">
              <div className="content">
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
          <div className="ItemName">
            <input
              className="ItemModalInputName"
              placeholder={`${item.name}`}
              onChange={(e) => setItemName(e.target.value)}
            ></input>
          </div>
          <hr style={{ width: "100%" }} />
          <div className="ItemPrice">
            <div className="ItemModalBodyLabel">Price:</div>
            <CurrencyInput
              className="ItemModalInputPrice"
              placeholder={`${item.price}`}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </div>
          <div className="ItemQuant">
            <div className="ItemModalBodyLabel">Quantity:</div>
            <input
              className="ItemModalInputPrice"
              placeholder={`${item.quantity}`}
              onChange={(e) => setItemQuantity(e.target.value)}
            ></input>
          </div>
          <div className="ItemLink">
            <div className="ItemModalBodyLabel">Link:</div>
            <input
              className="ItemModalInputPrice"
              placeholder={`${item.link}`}
              onChange={(e) => setItemLink(e.target.value)}
            ></input>
          </div>
          <button className="ItemModalSubmitBtn" onClick={() => handleSubmit()}>
            SAVE CHANGES
          </button>
          <button
            className="ItemModalDeleteBtn"
            onClick={() => handleDeleteItem()}
          >
            DELETE ITEM
          </button>
        </div>
      </div>
    </>
  );
};
