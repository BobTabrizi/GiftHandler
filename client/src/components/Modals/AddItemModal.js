import React, { useState, useEffect } from "react";
import "../../styles/ItemStyles/ItemModals.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../actions/itemActions";
import { addImage } from "../../actions/imageActions";
import CurrencyInput from "../Items/CurrencyInput";
import { deactivateModal } from "../../actions/modalActions";
/**
 *
 * @PageLocation Dashboard
 * @Component EditItemModal
 * @Description Modal that allows a user to edit attributes of an item
 *
 */
export const AddItemModal = () => {
  const id = useSelector((state) => state.auth.user.id);
  const GroupID = useSelector((state) => state.group.currentGroup.Group.id);
  const DispModal = useSelector((state) => state.modal.activeModal.modalType);
  const [itemprice, setItemPrice] = useState(0.0);
  const [itemname, setItemName] = useState("New Item");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemLink, setItemLink] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    `http://localhost:3005/api/images/DefaultItem`
  );
  const dispatch = useDispatch();

  const handleLink = (e) => {
    setItemLink(e);
    /*     Check to see if link is an amazon link, if it is, try to parse for the ASIN to pull an image      */
    if (e.includes("amazon.com/")) {
      try {
        //Most common prefix for ASIN is /dp/
        let idx = e.indexOf("/dp/");
        let offset = 4;

        //Another prefix is /gp/
        if (idx === -1) {
          idx = e.indexOf("/gp/");
          offset = 12;
        }

        //Extract ASIN with varying offset based on the prefix
        let ASIN = e.substr(idx + offset, 10);

        //Double check the ASIN is a valid length 10 string and use a heroku CORS proxy to fetch image client side
        if (ASIN.length === 10) {
          fetch(
            `${process.env.REACT_APP_HEROKU_CORS_PROXY}https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${ASIN}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL250`
          )
            .then((res) => res.blob())
            .then((blob) => {
              //Convert Blob to file for storage into S3
              var imgFile = new File([blob], "image");
              setFile(imgFile);
              setPreviewImage(URL.createObjectURL(blob));
            });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  /*  Add Event listener to close modal on background click      */
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target && e.target.className === "ItemModalBackground") {
        dispatch(deactivateModal());
      }
    };
    if (DispModal === "AddItem") {
      window.addEventListener("click", handleClick);
    }
  }, [DispModal]);

  /*  Upon File Input, set file state and display a preview image  */
  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  /*      Save image to S3             */
  const postImage = async ({ image }) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);
    const result = await dispatch(addImage(formData));
    return result;
  };

  /*    Exit modal entirely     */
  const handleModalClose = () => {
    dispatch(deactivateModal());
  };

  /*   Handle Addition of the item */
  const handleSubmit = async () => {
    let imageKey = "DefaultItem";
    //If file uploaded, add to S3
    if (file) {
      const imageInfo = await postImage({ image: file });
      imageKey = imageInfo.Key;
    }

    let newItem = {
      userID: id,
      price: itemprice,
      quantity: itemQuantity,
      link: itemLink,
      purchased: false,
      imageKey: imageKey,
      itemName: itemname,
      GroupID: GroupID,
    };
    //Then store the item attributes and Image key in DB
    dispatch(addItem(newItem));
    handleModalClose();
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
              placeholder="New Item"
              onChange={(e) => setItemName(e.target.value)}
            ></input>
          </div>
          <hr style={{ width: "100%" }} />
          <div className="ItemPrice">
            <div className="ItemModalBodyLabel">Price:</div>
            <CurrencyInput
              className="ItemModalInputPrice"
              placeholder="0.00"
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </div>
          <div className="ItemQuant">
            <div className="ItemModalBodyLabel">Quantity:</div>
            <input
              className="ItemModalInputPrice"
              placeholder="1"
              onChange={(e) => setItemQuantity(e.target.value)}
            ></input>
          </div>
          <div className="ItemLink">
            <div className="ItemModalBodyLabel">Link:</div>
            <input
              className="ItemModalInputPrice"
              placeholder="Purchase Link"
              onChange={(e) => handleLink(e.target.value)}
            ></input>
          </div>
          <button className="ItemModalSubmitBtn" onClick={() => handleSubmit()}>
            Add Item
          </button>
        </div>
      </div>
    </>
  );
};
