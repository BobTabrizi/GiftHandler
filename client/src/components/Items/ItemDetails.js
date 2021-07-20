import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/ItemStyles/RegistryItem.css";
import { deleteItem } from "../../actions/itemActions";
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
  const dispatch = useDispatch();
  const handleEditItem = () => {
    dispatch(selectEditItem(item));
  };

  return (
    <>
      <div className="ItemDetailContainer" onClick={() => handleEditItem()}>
        <div className="ItemImage">
          <img
            src={`/api/images/${item.image}`}
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
