import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/ItemStyles/RegistryItem.css";
import { ItemDetails } from "./ItemDetails";
import { UserItemDetails } from "./UserItemDetails";
import { AddItemCard } from "./AddItemCard";

/**
 *
 * @PageLocation Dashboard / UserGroupPage
 * @Component RegistryList
 * @Description Wrapper Component of Registry Items.
 *              Takes in a page type as a parameter and returns the appropriate list component.
 *              Dashboard items allow for editing and deletion, page items allow for purchase
 *
 */
export const RegistryList = (props) => {
  const items = useSelector((state) => state.item.memberItems);
  const filteredItems = useSelector((state) => state.item.filteredItems);

  //Seperate Item functionalities based on page.
  //Allow editing/Deleting on user Dashboard
  //Allow Item purchase on user page

  if (props.PageType === "Dashboard") {
    return (
      <>
        <div className="ItemListContainer">
          {!filteredItems && (
            <>
              <AddItemCard />

              {items &&
                items.map((item, index) => (
                  <div className="ItemContainer" key={index}>
                    <ItemDetails {...item} />
                  </div>
                ))}
            </>
          )}

          {filteredItems &&
            filteredItems.map((item, index) => (
              <div className="ItemContainer" key={index}>
                <ItemDetails {...item} />
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
                    <UserItemDetails {...item} />
                  </>
                ))}
            </>
          )}
          {filteredItems && (
            <>
              {filteredItems &&
                filteredItems.map((item, index) => (
                  <>
                    <UserItemDetails {...item} />
                  </>
                ))}
            </>
          )}
        </div>
      </>
    );
  }
};
