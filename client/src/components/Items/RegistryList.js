/**
 *
 * @PageLocation User Group/Event Pages
 * @Component RegistryList
 * @Description Wrapper Component of Registry Items.
 *
 */

import React from "react";
import { useSelector } from "react-redux";
import "../../styles/ItemStyles/RegistryItem.css";
import { ItemDetails } from "./ItemDetails";
import { AddItemCard } from "./AddItemCard";

export const RegistryList = (props) => {
  const items = useSelector((state) => state.item.memberItems);
  const filteredItems = useSelector((state) => state.item.filteredItems);

  return (
    <>
      <div className="ItemListContainer">
        {!filteredItems && (
          <>
            {props.CanEdit && <AddItemCard />}

            {items &&
              items.map((item, index) => (
                <div className="ItemSuperContainer" key={index}>
                  <div className="ItemContainer">
                    <ItemDetails item={item} CanEdit={props.CanEdit} />
                  </div>
                  <div className="ListItemName" style={{ color: "black" }}>
                    {item.name.substring(0, 20)}
                  </div>
                </div>
              ))}
          </>
        )}
        {filteredItems &&
          filteredItems.map((item, index) => (
            <div className="ItemSuperContainer" key={index}>
              <div className="ItemContainer">
                <ItemDetails item={item} CanEdit={props.CanEdit} />
              </div>
              <div className="ListItemName" style={{ color: "black" }}>
                {item.name.substring(0, 20)}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
