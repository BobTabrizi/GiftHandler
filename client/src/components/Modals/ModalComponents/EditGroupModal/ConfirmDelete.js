import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { deleteGroup } from "../../../../actions/groupActions";
import { unSelectEditGroup } from "../../../../actions/groupActions";
import { setModalPage } from "../../../../actions/modalActions";
/**
 *
 * @PageLocation ManageGroups
 * @Component ConfirmDelete
 * @Description Confirmation Modal for group deletion.
 *
 *
 */
export const ConfirmDelete = () => {
  const GroupID = useSelector(
    (state) => state.group.selectedGroup.groupDetails.id
  );
  const dispatch = useDispatch();

  /*If user declines deletion move back to modal menu */
  const handleDecline = () => {
    dispatch(setModalPage("GroupMenu"));
  };

  /*If user accepts, delete the group */
  const handleDelete = () => {
    dispatch(deleteGroup(GroupID));
    dispatch(unSelectEditGroup());
  };

  return (
    <>
      <div className="ConfirmDeleteContainer">
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
      </div>
    </>
  );
};
