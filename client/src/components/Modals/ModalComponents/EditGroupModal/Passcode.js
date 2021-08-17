/**
 *
 * @PageLocation HomePage (EditGroupModal)
 * @Component Passcode
 * @Description Reset group passcode modal.
 *
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unSelectEditGroup } from "../../../../actions/groupActions";
import { deactivateModal } from "../../../../actions/modalActions";
import "../../../../styles/GroupStyles/GroupModals.css";
import { EditGroupDetails } from "../../../../actions/groupActions";

export const Passcode = () => {
  const [passcode, setPasscode] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const dispatch = useDispatch();
  const GroupID = useSelector(
    (state) => state.group.selectedGroup.groupDetails.groupid
  );

  /*     Close out the modal entirely   */
  const closeModal = () => {
    dispatch(unSelectEditGroup());
    dispatch(deactivateModal());
  };

  /*   Process passcode change request  */
  const handleSubmit = async () => {
    let GroupProperties = {
      PassObject: {
        GroupID: GroupID,
        newPass: passcode,
      },
    };

    let Response = await dispatch(EditGroupDetails(GroupProperties));
    if (Response.status === 201) {
      setDisplaySuccess(true);
    }
  };

  return (
    <>
      <div
        className="PasscodeContainer"
        style={{ display: displaySuccess ? "none" : "block" }}
      >
        <div className="PasscodeBody">
          <h2>Enter a New Passcode</h2>
          <input
            className="PasscodeInput"
            placeholder="Passcode"
            onChange={(e) => setPasscode(e.target.value)}
          ></input>
        </div>
        <div style={{ marginTop: "10%" }}>
          <div className="SubmitPasscode">
            <button
              className="PasscodeSubmitBtn"
              onClick={() => handleSubmit()}
            >
              Change Passcode
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: displaySuccess ? "block" : "none" }}>
        Passcode Change Successful!
        <div className="PasscodeConfirmation">
          <button
            style={{ fontSize: 22, cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};
