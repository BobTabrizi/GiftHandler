import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { leaveGroup } from "../../actions/groupActions";
import { deactivateModal } from "../../actions/modalActions";
import {
  deleteItem,
  unSelectEditItem,
  editItem,
} from "../../actions/itemActions";
import "../../styles/NavigationStyles/ConfirmModal.css";
import { ModalTypes } from "./ModalComponents/ConfirmationModal/ModalTypes";
/**
 *
 * @PageLocation Various Pages
 * @Component ConfirmationModal
 * @Description Handles confirmation of various actions based on ActionID
 *
 * ActionID Reference: 0 -> Leave Group   1 -> Delete Item   2 -> Purchase Item
 *
 */
export const ConfirmationModal = () => {
  const ModalData = useSelector((state) => state.modal.modalData);
  const dispatch = useDispatch();

  /*   Close modal on decline    */
  const handleDecline = () => {
    dispatch(deactivateModal());
  };

  /* Based on modal action, handle confirmation accordingly */
  const handleConfirm = () => {
    if (ModalData.ActionID === 0) {
      dispatch(leaveGroup(ModalData.groupID, ModalData.userID));
    }

    if (ModalData.ActionID === 1) {
      dispatch(
        deleteItem(
          ModalData.ItemID,
          ModalData.ItemImage,
          ModalData.userID,
          ModalData.groupID
        )
      );
      dispatch(unSelectEditItem());
    }

    if (ModalData.ActionID === 2) {
      dispatch(editItem(ModalData.item));
    }

    //Exit modal and clear modal data
    dispatch(deactivateModal());
  };

  return (
    <>
      <div className="ConfirmModalBackground">
        <div className="ConfirmModalContainer">
          <div className="ConfirmModalHeader">
            {ModalData && <div>{ModalTypes[ModalData.ActionID].Title}</div>}
          </div>
          <div className="ConfirmBody">
            <div className="ConfirmWarning">
              Warning: <br />
              {ModalData && <div>{ModalTypes[ModalData.ActionID].Warning}</div>}
            </div>
            <div className="ConfirmButtons">
              <div>
                <button
                  onClick={() => {
                    handleDecline();
                  }}
                  style={{
                    backgroundColor: "red",
                    borderRadius: 10,
                    padding: "5%",
                    color: "white",
                    fontSize: 30,
                    width: "80px",
                    cursor: "pointer",
                  }}
                >
                  NO
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleConfirm()}
                  style={{
                    backgroundColor: "green",
                    borderRadius: 10,
                    padding: "5%",
                    color: "white",
                    fontSize: 30,
                    width: "80px",
                    cursor: "pointer",
                    marginLeft: "10%",
                  }}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
