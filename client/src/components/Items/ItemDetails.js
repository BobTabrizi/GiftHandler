import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/ItemStyles/RegistryItem.css";
import { deleteItem } from "../../actions/itemActions";
import { IoTrash } from "react-icons/io5";
import { IoPencilSharp } from "react-icons/io5";
import { selectEditItem } from "../../actions/itemActions";

/**
 *
 * @PageLocation Dashboard
 * @Component UserItemDetails
 * @Description Displays Registry Items for the current user on the dashboard.
 *              Functionality to edit and delete registry items.
 *
 */
export const ItemDetails = (item) => {
  const [hover, SetHover] = useState("none");
  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(deleteItem(item.itemid, item.image));
  };

  const handleEditItem = () => {
    dispatch(selectEditItem(item));
  };

  return (
    <>
      <div className="ItemDetailContainer" onClick={() => handleEditItem()}>
        <div className="ItemImage">
          <img
            src={`http://localhost:3005/api/images/${item.image}`}
            style={{ width: "100%", height: "100%", display: "block" }}
            alt="Registry Item"
          ></img>
        </div>
        <div className="ListItemName">{item.name}</div>
        <hr style={{ width: "100%" }} />
        <div className="ListItemPrice">Price: {item.price}</div>
        <div className="ListItemQuant">Quantity: {item.quantity}</div>
        {item.link && <p>Purchase Link</p>}
      </div>
    </>
  );
};
