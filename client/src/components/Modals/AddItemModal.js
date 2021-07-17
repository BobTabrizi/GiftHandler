import React, { useState } from "react";
import "../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../actions/itemActions";
import { addImage } from "../../actions/imageActions";
import { unSelectAddItem } from "../../actions/itemActions";
import CurrencyInput from "../CurrencyInput";

/**
 * @PageLocation Dashboard
 * @Component AddItemModal
 * @Description Modal that allows a user to add a new item
 *
 */
export const AddItemModal = () => {
  const id = useSelector((state) => state.auth.user.id);
  const GroupID = useSelector((state) => state.group.currentGroup.Group.id);
  const [price, setPrice] = useState(0);
  const [itemname, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemLink, setItemLink] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "http://localhost:3005/api/images/DefaultItem"
  );
  const dispatch = useDispatch();

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

  /*     Close modal           */
  const handleModalClose = () => {
    dispatch(unSelectAddItem());
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
      price: price,
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
      <div className="itemModalBackground">
        <div className="modalContainer">
          <div className="modalHeader">
            <div style={{ margin: "auto" }}>Add an Item</div>
            <div className="modalCloseButton">
              <button
                onClick={() => handleModalClose()}
                style={{ fontSize: 22 }}
              >
                X
              </button>
            </div>
          </div>
          <div className="modalBody">
            <div className="modalInputContainer">
              <div className="modalInputLabel">Item Name</div>
              <input
                className="modalInput"
                placeholder="New Item"
                onChange={(e) => setItemName(e.target.value)}
              ></input>
            </div>
            <div className="modalInputContainer">
              <div className="modalInputLabel">Item Price</div>
              <CurrencyInput
                className="modalInput"
                placeholder="$0.00"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="modalInputContainer">
              <div className="modalInputLabel">Item Quantity</div>
              <input
                className="modalInput"
                placeholder="1"
                onChange={(e) => setItemQuantity(e.target.value)}
              ></input>
            </div>

            <div className="modalInputContainer">
              <div className="modalInputLabel">Purchase Link</div>
              <input
                className="modalInput"
                placeholder="Item Link"
                onChange={(e) => setItemLink(e.target.value)}
              ></input>
            </div>

            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <input
                type="file"
                id="imgUpload"
                style={{ display: "none" }}
                placeholder="Enter the price of the item"
                onChange={fileSelected}
                accept="image/*"
              ></input>
              <label htmlFor="imgUpload" className="ImageUploadBtn">
                Upload an Image
              </label>
            </div>
            <img
              src={previewImage}
              height={200}
              width={300}
              alt="Registry Item"
            ></img>
          </div>
          <div className="footer">
            <div className="modalCreateButton">
              <button
                style={{ fontSize: 22, cursor: "pointer" }}
                onClick={() => handleSubmit()}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
