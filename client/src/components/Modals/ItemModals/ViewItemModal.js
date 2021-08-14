import React, { useState, useEffect } from "react";
import "../../../styles/ItemStyles/ItemModals.css";
import { useDispatch, useSelector } from "react-redux";
import { getItemImage, unSelectEditItem } from "../../../actions/itemActions";
import { deactivateModal } from "../../../actions/modalActions";
import { UserChecker } from "../../Auth/UserChecker";
import { setActiveModal, updateModalData } from "../../../actions/modalActions";
/**
 *
 * @PageLocation User Group/Event pages
 * @Component ViewItemModal
 * @Description Item modal for users to view and purchase items.
 *
 */
export const ViewItemModal = () => {
  const AuthInfo = useSelector((state) => state.auth);
  const Item = useSelector((state) => state.item.selectedItem.itemDetails);
  /*
  const ItemState = useSelector((state) =>
    state.item.memberItems.filter(
      (StateItem) => StateItem.itemid === props.item.itemid
    )
  );
  */
  const GroupID = useSelector((state) => state.group.pageGroup.groupid);
  const DispModal = useSelector((state) => state.modal.activeModal.modalType);
  const [UID, setUID] = useState(null);
  const dispatch = useDispatch();

  const shortenInfo = (str, maxLen, separator = " ") => {
    if (str) {
      if (str.length <= maxLen) return str;
      return str.substr(0, str.lastIndexOf(separator, maxLen));
    }
  };

  const handlePurchase = () => {
    let NewQty = Item.quantity;
    if (NewQty >= 0) {
      NewQty--;
    }
    let itemData = {
      itemid: Item.itemid,
      price: Item.price,
      quantity: NewQty,
      link: Item.link,
      imageKey: Item.image,
      name: Item.name,
    };
    let ModalData = {
      ActionID: 2,
      item: itemData,
    };
    dispatch(updateModalData(ModalData));
    dispatch(setActiveModal("Confirm"));
  };

  useEffect(() => {
    let user = UserChecker(AuthInfo.token);
    if (user) {
      setUID(user.id);
    }
  }, []);

  /*    Exit modal entirely     */
  const handleModalClose = () => {
    dispatch(unSelectEditItem());
    dispatch(deactivateModal());
  };

  return (
    <>
      <div className="ItemModalBackground">
        <div
          className="ViewItemModalExitBtn"
          onClick={() => handleModalClose()}
        >
          X
        </div>
        <div className="ViewItemModalContainer">
          <div>
            <div className="ItemName">{Item.name}</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="ViewItemPrice">
                <div className="ItemModalBodyLabel">Price: ${Item.price}</div>
              </div>
              <div className="ItemImageWrapper">
                <div className="ViewItemImageContainer">
                  <div className="ViewImageContent">
                    <img
                      className="content-image"
                      src={`/api/images/${Item.image}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                      }}
                      alt="Registry Item"
                    ></img>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div className="ViewItemQuant">
                  <div className="ItemModalBodyLabel">Qty: {Item.quantity}</div>
                </div>
              </div>
            </div>
            <div className="ItemLink">
              <div className="ItemModalBodyLabel">
                <button
                  className="ViewItemLinkBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `${Item.link}`;
                  }}
                >
                  Link
                </button>
              </div>
            </div>
            <div className="ViewItemDescription">
              {shortenInfo(Item.description, 150)}
            </div>
            <div className="ItemDetailFooter">
              <div className="ItemLink"></div>
              <button
                className="ViewItemPurchaseBtn"
                onClick={() => handlePurchase()}
              >
                Purchase Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
