import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/ItemStyles/RegistryItem.css";
import { setActiveModal } from "../../actions/modalActions";
import { IoAdd } from "react-icons/io5";

/**
 *
 * @PageLocation Dashboard
 * @Component PlaceHolderAddItem
 * @Description Add Item button for the user dashboard.
 *              Opens modal to add an item to a registry list.
 *
 */
export const AddItemCard = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.memberItems);
  const handleAddItem = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setActiveModal("AddItem"));
  };
  return (
    <>
      {items && items.length !== 0 && (
        <div className="AddItemCard" onClick={() => handleAddItem()}>
          <div className="ItemName">ADD NEW ITEM</div>
          <IoAdd style={{ fontSize: 150, color: "gray" }} />
        </div>
      )}

      {(!items || items.length === 0) && (
        <>
          <div
            className="AddItemCard"
            onClick={() => handleAddItem()}
            style={{ width: "14%" }}
          >
            <div className="ItemName">Start by adding an item</div>
            <IoAdd style={{ fontSize: 150, color: "gray" }} />
          </div>
        </>
      )}
    </>
  );
};
