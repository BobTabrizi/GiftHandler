import React, { useState, useEffect } from "react";
import "../../styles/ItemStyles/ItemModals.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItemImage } from "../../actions/itemActions";
import { addImage } from "../../actions/imageActions";
import CurrencyInput from "../Items/CurrencyInput";
import { deactivateModal } from "../../actions/modalActions";
import { UserChecker } from "../../components/Auth/UserChecker";
/**
 *
 * @PageLocation Dashboard
 * @Component EditItemModal
 * @Description Modal that allows a user to edit attributes of an item. TODO ADD EXIT BUTTON
 *
 */
export const AddItemModal = () => {
  const AuthInfo = useSelector((state) => state.auth);
  const GroupID = useSelector((state) => state.group.pageGroup.groupid);
  const DispModal = useSelector((state) => state.modal.activeModal.modalType);
  const [itemprice, setItemPrice] = useState(0.0);
  const [itemname, setItemName] = useState("New Item");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemLink, setItemLink] = useState(null);
  const [file, setFile] = useState(null);
  const [UID, setUID] = useState(null);
  const [previewImage, setPreviewImage] = useState(`/api/images/DefaultItem`);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const HandleLink = async (e) => {
    setItemLink(e);
    let Vendor;
    if (e.includes("amazon.com/")) {
      Vendor = "Amazon";
    }
    if (e.includes("target.com/")) {
      Vendor = "Target";
    }
    if (e.includes("etsy.com/")) {
      Vendor = "Etsy";
    }

    let ItemDetails = {
      Vendor: Vendor,
      Link: e,
    };

    if (Vendor && e.length > 25) {
      setIsLoading(true);
      let ItemResponse = await dispatch(getItemImage(ItemDetails));
      //If the request was successful
      if (ItemResponse.status === 201) {
        //First set the price and name
        if (ItemResponse.data.ItemPrice !== "undefined") {
          setItemPrice(ItemResponse.data.ItemPrice.substring(1));
        }
        setItemName(ItemResponse.data.ItemName);

        //Then convert the image url and set the preview using a heroku CORS proxy to fetch image client side
        fetch(
          `${process.env.REACT_APP_HEROKU_CORS_PROXY}${ItemResponse.data.ItemImage}`
        )
          .then((res) => res.blob())
          .then((blob) => {
            //Convert Blob to file for storage into S3
            var imgFile = new File([blob], "image");
            setFile(imgFile);
            setPreviewImage(URL.createObjectURL(blob));
          });
        setIsLoading(false);
      }
    }
  };

  /*  Add Event listener to close modal on background click      */
  useEffect(() => {
    let user = UserChecker(AuthInfo.token);
    setUID(user.id);
  }, []);

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
      userID: UID,
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

          <label
            htmlFor="imageUpload"
            className="NewImageBtn"
            style={{ opacity: isLoading ? 0 : 1 }}
          >
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
          <div className="loader" style={{ opacity: isLoading ? 1 : 0 }} />
          <div className="ItemName">
            <input
              className="ItemModalInputName"
              value={itemname}
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
              value={itemprice}
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
              onChange={(e) => HandleLink(e.target.value)}
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
