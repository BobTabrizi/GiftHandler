/**
 *
 * @PageLocation Group/Event Pages
 * @Component UserItemDetails
 * @Description Displays Registry Items and their properties.
 *              Functionality changes based on type of page
 *              as well as if the user owns the items.
 *
 */

import React from "react";
import "../../styles/ItemStyles/RegistryItem.css";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModal } from "../../actions/modalActions";
import { selectEditItem } from "../../actions/itemActions";
import { selectViewItem } from "../../actions/itemActions";

export const ItemDetails = (props) => {
  const ItemState = useSelector((state) =>
    state.item.memberItems.filter(
      (StateItem) => StateItem.itemid === props.item.itemid
    )
  );
  const dispatch = useDispatch();

  const handleItemClick = () => {
    if (ItemState[0].quantity !== 0) {
      if (props.CanEdit) {
        dispatch(selectEditItem(props.item));
      } else {
        dispatch(selectViewItem(props.item));
        dispatch(setActiveModal("ViewItem"));
      }
    }
  };

  return (
    <>
      <div onClick={() => handleItemClick()}>
        {ItemState[0].quantity === 0 && (
          <div className="PurchasedItem">
            <div className="PurchasedItemText">Item Purchased</div>
          </div>
        )}
        <div className="ItemDetailContainer">
          <div className="ItemImage">
            <img
              src={`/api/images/${props.item.image}`}
              style={{ width: "95%", height: "100%", display: "block" }}
              alt="Registry Item"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};
