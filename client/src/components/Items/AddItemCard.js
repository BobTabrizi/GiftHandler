import React from "react";
import { useDispatch } from "react-redux";
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

  const handleAddItem = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setActiveModal("AddItem"));
  };
  return (
    <>
      <div className="AddItemCard" onClick={() => handleAddItem()}>
        <div className="ItemName">ADD NEW ITEM</div>

        <IoAdd style={{ fontSize: 250, color: "gray" }} />
      </div>
    </>
  );
};
