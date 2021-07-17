import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/Modal.css";
import { setActiveModal } from "../../../../actions/modalActions";
import { deleteGroup } from "../../../../actions/groupActions";
import { unSelectEditGroup } from "../../../../actions/groupActions";
/**
 *
 * @PageLocation GroupPage
 * @Component ConfirmDelete
 * @Description Modal Component for the Edit Group Modal
 *
 *
 */
export const ConfirmDelete = () => {
  const GroupID = useSelector(
    (state) => state.group.selectedGroup.groupDetails.id
  );
  const dispatch = useDispatch();

  const handleDecline = () => {
    dispatch(setActiveModal("Main"));
  };
  const handleDelete = () => {
    dispatch(deleteGroup(GroupID));
    dispatch(unSelectEditGroup());
  };

  return (
    <>
      <div className="EditModalHeader">
        <div>Delete Group</div>
      </div>
      <div className="body">Are you sure you want to delete this group?</div>
      <div className="footer">
        <button
          onClick={() => {
            handleDecline();
          }}
          style={{
            backgroundColor: "red",
            borderRadius: 15,
            padding: "1%",
            color: "white",
            fontSize: 30,
            cursor: "pointer",
          }}
        >
          NO
        </button>
        <button
          onClick={() => handleDelete()}
          style={{
            backgroundColor: "green",
            borderRadius: 15,
            padding: "1%",
            color: "white",
            fontSize: 30,
            cursor: "pointer",
            marginLeft: "10%",
          }}
        >
          YES
        </button>
      </div>
    </>
  );
};
