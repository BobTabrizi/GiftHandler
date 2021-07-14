import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/RegistryItem.css";
import { deleteItem } from "../actions/itemActions";

export const RegistryList = () => {
  const items = useSelector((state) => state.item.memberItems);
  const dispatch = useDispatch();
  const handleDeleteItem = (item) => {
    dispatch(deleteItem(item.itemid, item.image));
  };

  return (
    <>
      <div className="ItemListContainer">
        {items &&
          items.map((item, index) => (
            <div className="ItemContainer" key={index}>
              <div className="ItemName">{item.name}</div>
              <div className="ItemImage">
                <img
                  src={`http://localhost:3005/api/items/images/${item.image}`}
                  style={{ width: "100%", height: "100%", display: "block" }}
                ></img>
              </div>

              <div className="ItemDescription">
                Sample Text fsdfsdfs fsdfsdfsf fsdfsdfsdfsdf fsdfsdfsdfsdf
                <button
                  style={{
                    marginTop: "10%",
                    cursor: "pointer",
                    backgroundColor: "red",
                    borderRadius: "15px",
                  }}
                  onClick={() => handleDeleteItem({ ...item })}
                >
                  DELET THIS
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
