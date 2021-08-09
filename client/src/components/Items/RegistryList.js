import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/ItemStyles/RegistryItem.css";
import { ItemDetails } from "./ItemDetails";
import { AddItemCard } from "./AddItemCard";

/**
 *
 * @PageLocation User Group/Event Pages
 * @Component RegistryList
 * @Description Wrapper Component of Registry Items.
 *
 *
 */
export const RegistryList = (props) => {
  const items = useSelector((state) => state.item.memberItems);
  const filteredItems = useSelector((state) => state.item.filteredItems);

  //Seperate Item functionalities based on page.

  if (props.CanEdit) {
    return (
      <>
        <div className="ItemListContainer">
          {!filteredItems && (
            <>
              <AddItemCard />
              {items &&
                items.map((item, index) => (
                  <div className="ItemContainer" key={index}>
                    <ItemDetails item={item} CanEdit={props.CanEdit} />
                  </div>
                ))}
            </>
          )}
          {filteredItems &&
            filteredItems.map((item, index) => (
              <div className="ItemContainer" key={index}>
                <ItemDetails item={item} CanEdit={props.CanEdit} />
              </div>
            ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="ItemListContainer">
          {!filteredItems && (
            <>
              {items &&
                items.map((item, index) => (
                  <>
                    <div className="ItemContainer" key={index}>
                      <ItemDetails item={item} CanEdit={props.CanEdit} />
                    </div>
                  </>
                ))}
            </>
          )}
          {filteredItems && (
            <>
              {filteredItems &&
                filteredItems.map((item, index) => (
                  <>
                    <div className="ItemContainer" key={index}>
                      <ItemDetails item={item} CanEdit={props.CanEdit} />
                    </div>
                  </>
                ))}
            </>
          )}
        </div>
      </>
    );
  }
};
