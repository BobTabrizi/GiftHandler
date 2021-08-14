import React, { useState, useEffect } from "react";
import "../../../styles/ItemStyles/ItemModals.css";
import { useDispatch, useSelector } from "react-redux";
import { editItem, getItemImage } from "../../../actions/itemActions";
import { addImage, deleteImage } from "../../../actions/imageActions";
import CurrencyInput from "../../Items/CurrencyInput";
import { unSelectEditItem } from "../../../actions/itemActions";
import { setActiveModal, updateModalData } from "../../../actions/modalActions";

/**
 *
 * @PageLocation Group/Event Pages
 * @Component EditItemModal
 * @Description Modal that allows a user to edit attributes of an item
 *
 */
export const EditItemModal = () => {
  const item = useSelector((state) => state.item.selectedItem.itemDetails);
  const DispModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const [itemprice, setItemPrice] = useState(item.price);
  const [itemname, setItemName] = useState(item.name);
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [itemLink, setItemLink] = useState(item.link);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(`/api/images/${item.image}`);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  /*  Upon File Input, set file state and display a preview image  */
  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

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
    let ModalData = {
      ActionID: 1,
      ItemID: item.itemid,
      ItemImage: item.image,
    };
    dispatch(updateModalData(ModalData));
    dispatch(setActiveModal("Confirm"));
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
      description: itemDescription,
    };
    dispatch(editItem(itemObject));
    //Exit Modal
    dispatch(unSelectEditItem());
  };

  return (
    <>
      <div className="ItemModalBackground">
        <div className="ItemModalExitBtn" onClick={() => handleModalClose()}>
          X
        </div>
        <div className="ItemModalContainer">
          <div>
            <div className="ItemName">
              <input
                className="ItemModalInputName"
                value={itemname}
                placeholder=""
                style={{ width: "100%" }}
                onChange={(e) => setItemName(e.target.value)}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="ItemImageWrapper">
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
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                        }}
                        alt="Registry Item"
                      ></img>
                      <div className="content-details fadeIn-top">
                        <h3>Choose a new photo</h3>
                      </div>
                    </div>
                  </div>
                </label>
                <div
                  className="loader"
                  style={{ opacity: isLoading ? 1 : 0 }}
                />
              </div>
              <div className="ItemDetailBody">
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
                  <textarea
                    className="LinkInput"
                    rows="7"
                    cols="25"
                    placeholder="Purchase Link"
                    value={item.link}
                    onChange={(e) => HandleLink(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <hr />
            <div className="ItemDetailFooter">
              <div className="ItemLink">
                <textarea
                  className="LinkInput"
                  rows="10"
                  cols="50"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => setItemDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                className="ItemModalSubmitBtn"
                onClick={() => handleSubmit()}
              >
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
        </div>
      </div>
    </>
  );
};
