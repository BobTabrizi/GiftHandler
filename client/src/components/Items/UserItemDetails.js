import React from "react";

import "../../styles/RegistryItem.css";

/**
 * @PageLocation UserGroupPage
 * @Component UserItemDetails
 * @Description Displays Registry Items for other users.
 *              Functionality to allow purchase of items (TODO)
 *
 */
export const UserItemDetails = (item) => {
  return (
    <>
      <div className="ItemDetailContainer">
        <div className="ItemName">{item.name}</div>
        <div className="ItemImage">
          <img
            src={`http://localhost:3005/api/images/${item.image}`}
            style={{ width: "100%", height: "100%", display: "block" }}
            alt="Registry Item"
          ></img>
        </div>

        <div className="ItemDescription">
          Sample Text fsdfsdfs fsdfsdfsf fsdfsdfsdfsdf fsdfsdfsdfsdf
        </div>
      </div>
    </>
  );
};
