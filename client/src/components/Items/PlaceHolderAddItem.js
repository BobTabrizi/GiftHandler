import React from "react";
import { useDispatch } from "react-redux";
import "../../styles/RegistryItem.css";
import { selectAddItem } from "../../actions/itemActions";

/**
 *
 * @PageLocation Dashboard
 * @Component PlaceHolderAddItem
 * @Description Add Item button for the user dashboard.
 *              Opens modal to add an item to a registry list.
 *
 */
export const PlaceHolderAddItem = () => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(selectAddItem());
  };
  return (
    <>
      <div className="PlaceHolderItemContainer">
        <div className="ItemName">ADD NEW ITEM</div>
        <div className="PlaceHolderAddImage" onClick={() => handleAddItem()}>
          <img
            src={`http://localhost:3005/api/images/PlusImage`}
            style={{
              marginTop: "20%",
              width: "100%",
              height: "100%",
              display: "block",
            }}
            alt="Registry Item"
          ></img>
        </div>
      </div>
    </>
  );
};
