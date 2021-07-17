import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/RegistryItem.css";
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
  const showItemOptions = (e) => {
    e.preventDefault();
    SetHover("block");
  };
  const hideItemOptions = (e) => {
    e.preventDefault();
    SetHover("none");
  };
  return (
    <>
      <div
        className="ItemDetailContainer"
        onMouseEnter={(e) => showItemOptions(e)}
        onMouseLeave={(e) => hideItemOptions(e)}
      >
        <div className="ItemOptions" style={{ display: hover }}>
          <IoPencilSharp
            style={{ marginRight: "5%", cursor: "pointer" }}
            onClick={() => handleEditItem()}
          />

          <IoTrash
            style={{ marginLeft: "5%", cursor: "pointer" }}
            onClick={() => handleDeleteItem()}
          />
        </div>
        <div className="ItemImage">
          <img
            src={`http://localhost:3005/api/images/${item.image}`}
            style={{ width: "100%", height: "100%", display: "block" }}
            alt="Registry Item"
          ></img>
        </div>
        <div className="ItemName">{item.name}</div>
        <hr style={{ width: "100%" }} />
        <div>Price: {item.price}</div>
        <div>Quantity: {item.quantity}</div>
        {item.link && <a href={item.link}>Purchase Link</a>}
      </div>
    </>
  );
};
