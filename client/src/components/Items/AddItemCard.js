/**
 *
 * @PageLocation User Group/Event Pages
 * @Component PlaceHolderAddItem
 * @Description  Opens a modal to add an item to a registry list.
 *
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/ItemStyles/RegistryItem.css";
import { setActiveModal } from "../../actions/modalActions";
import { IoAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

export const AddItemCard = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.memberItems);
  const handleAddItem = () => {
    dispatch(setActiveModal("AddItem"));
  };
  return (
    <>
      {items && items.length !== 0 && (
        <div className="AddItemCard" onClick={() => handleAddItem()}>
          <div className="ItemName">Add Item</div>
          <FaPlus style={{ fontSize: 60, color: "gray" }} />
        </div>
      )}

      {(!items || items.length === 0) && (
        <>
          <div
            className="AddItemCard"
            onClick={() => handleAddItem()}
            style={{ width: 250 }}
          >
            <div className="ItemName">Add an item</div>
            <IoAdd style={{ fontSize: 150, color: "gray" }} />
          </div>
        </>
      )}
    </>
  );
};
