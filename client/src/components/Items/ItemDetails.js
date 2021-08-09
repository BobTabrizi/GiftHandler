import React, { useState } from "react";
import "../../styles/ItemStyles/RegistryItem.css";
import { useSelector, useDispatch } from "react-redux";
import { editItem } from "../../actions/itemActions";
import { setActiveModal, updateModalData } from "../../actions/modalActions";
import { selectEditItem } from "../../actions/itemActions";
/**
 * @PageLocation UserGroupPage
 * @Component UserItemDetails
 * @Description Displays Registry Items and their properties.
 *              Functionality changes based on type of page
 *              as well as if the user owns the items.
 *
 */
export const ItemDetails = (props) => {
  const GroupType = useSelector((state) => state.group.pageGroup.mode);
  const User = useSelector((state) => state.auth);
  const ItemState = useSelector((state) =>
    state.item.memberItems.filter(
      (StateItem) => StateItem.itemid === props.item.itemid
    )
  );
  const [pageType, setPageType] = useState(
    window.location.href.includes("groups") ? "UserPage" : "HomePage"
  );

  const dispatch = useDispatch();

  const handleItemClick = () => {
    if (props.CanEdit) {
      dispatch(selectEditItem(props.item));
    }
  };

  const handlePurchase = () => {
    let NewQty = ItemState[0].quantity;
    if (NewQty >= 0) {
      NewQty--;
    }
    let itemData = {
      itemid: props.item.itemid,
      price: props.item.price,
      quantity: NewQty,
      link: props.item.link,
      imageKey: props.item.image,
      name: props.item.name,
    };

    let ModalData = {
      ActionID: 2,
      item: itemData,
    };
    dispatch(updateModalData(ModalData));
    dispatch(setActiveModal("Confirm"));
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
              style={{ width: "100%", height: "100%", display: "block" }}
              alt="Registry Item"
            ></img>
          </div>
          <div className="ListItemName">{props.item.name}</div>
          <hr style={{ width: "100%" }} />
          <div className="ListItemPrice">Price: {props.item.price}</div>
          <div className="ListItemQuant">Quantity: {ItemState[0].quantity}</div>
          {props.item.link && (
            <a className="PurchaseLink" href={props.item.link}>
              Purchase Link
            </a>
          )}
          {GroupType === 1 && !props.CanEdit && (
            <button className="PurchaseBtn" onClick={() => handlePurchase()}>
              Purchase
            </button>
          )}
        </div>
      </div>
    </>
  );
};
