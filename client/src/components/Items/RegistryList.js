import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/RegistryItem.css";
import { ItemDetails } from "./ItemDetails";
export const RegistryList = () => {
  const items = useSelector((state) => state.item.memberItems);
  return (
    <>
      <div className="ItemListContainer">
        {items &&
          items.map((item, index) => (
            <div className="ItemContainer" key={index}>
              <ItemDetails {...item} />
            </div>
          ))}
      </div>
    </>
  );
};
