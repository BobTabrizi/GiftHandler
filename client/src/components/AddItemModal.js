import React, { useState, useEffect } from "react";
import "../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../actions/itemActions";
import { addImage } from "../actions/itemActions";

export const AddItemModal = ({ closeModal }) => {
  const id = useSelector((state) => state.auth.user.id);
  const [price, setPrice] = useState(0);
  const [itemname, setItemName] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const postImage = async ({ image }) => {
    let formData = new FormData();
    formData.append("image", image);
    const result = await dispatch(addImage(formData));
    return result;
  };

  const handleSubmit = async () => {
    //First Store image in S3 and get the key
    const imageInfo = await postImage({ image: file });

    const imageKey = imageInfo.Key;
    //Then store the item attributes and S3 key in DB
    dispatch(addItem(id, price, imageKey, itemname));
    closeModal(false);
  };

  return (
    <>
      <div className="itemModalBackground">
        <div className="modalContainer">
          <div className="modalCloseButton">
            <button onClick={() => closeModal(false)} style={{ fontSize: 22 }}>
              X
            </button>
          </div>
          <div className="header">
            <h1>Add an Item</h1>
          </div>
          <div className="body">
            <div>
              Item Name
              <input
                className="modalInput"
                placeholder="Enter the name of the item"
                onChange={(e) => setItemName(e.target.value)}
              ></input>
            </div>
            <div style={{ marginTop: 15 }}>
              Item Price
              <input
                className="modalInput"
                placeholder="Enter the price of the item"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div style={{ marginTop: 15 }}>
              Item Image
              <input
                type="file"
                placeholder="Enter the price of the item"
                onChange={fileSelected}
                accept="image/*"
              ></input>
            </div>
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
