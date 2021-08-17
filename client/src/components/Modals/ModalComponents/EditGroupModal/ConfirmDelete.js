/**
 *
 * @PageLocation HomePage (EditGroupModal)
 * @Component ConfirmDelete
 * @Description Confirmation Modal for group deletion.
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { deleteGroup } from "../../../../actions/groupActions";
import { unSelectEditGroup } from "../../../../actions/groupActions";
import { setModalPage } from "../../../../actions/modalActions";
import { deactivateModal } from "../../../../actions/modalActions";

export const ConfirmDelete = () => {
  const GroupID = useSelector(
    (state) => state.group.selectedGroup.groupDetails.groupid
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
    dispatch(deactivateModal());
  };

  return (
    <>
      <div className="ConfirmDeleteContainer">
        <div className="ConfirmDeleteHeader">
          Are you sure you want to delete this group?
        </div>
        <div className="ConfirmDeleteBtns">
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
              width: 150,
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
              width: 150,
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
