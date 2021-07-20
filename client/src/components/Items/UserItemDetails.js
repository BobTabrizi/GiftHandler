import React from "react";
import "../../styles/ItemStyles/RegistryItem.css";
import { useSelector, useDispatch } from "react-redux";
import { editItem } from "../../actions/itemActions";
/**
 * @PageLocation UserGroupPage
 * @Component UserItemDetails
 * @Description Displays Registry Items for other users.
 *              Functionality to allow purchase of items
 *
 */
export const UserItemDetails = (item) => {
  const GroupType = useSelector((state) => state.group.pageGroup.mode);
  const ItemState = useSelector((state) =>
    state.item.memberItems.filter(
      (StateItem) => StateItem.itemid === item.itemid
    )
  );

  const dispatch = useDispatch();
  const handlePurchase = () => {
    let NewQty = ItemState[0].quantity;
    if (NewQty >= 0) {
      NewQty--;
    }
    let itemObject = {
      itemid: item.itemid,
      price: item.price,
      quantity: NewQty,
      link: item.link,
      imageKey: item.image,
      name: item.name,
    };
    dispatch(editItem(itemObject));
  };
  return (
    <>
      <div className="ItemContainer">
        {ItemState[0].quantity === 0 && (
          <div className="PurchasedItem">
            <div className="PurchasedItemText">Item Purchased</div>
          </div>
        )}
        <div className="ItemDetailContainer">
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
          <div className="ListItemQuant">Quantity: {ItemState[0].quantity}</div>
          {item.link && (
            <a className="PurchaseLink" href={item.link}>
              Purchase Link
            </a>
          )}
          {GroupType === 1 && (
            <button className="PurchaseBtn" onClick={() => handlePurchase()}>
              Purchase
            </button>
          )}
        </div>
      </div>
    </>
  );
};
