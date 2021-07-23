import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { unSelectEditGroup } from "../../../../actions/groupActions";
import { deactivateModal } from "../../../../actions/modalActions";
import { setModalPage } from "../../../../actions/modalActions";
import "../../../../styles/GroupStyles/GroupModals.css";
import { IoArrowBack } from "react-icons/io5";
/**
 *
 * @PageLocation ManageGroups
 * @Component Passcode
 * @Description Reset group passcode modal.
 *
 *
 */
export const Passcode = () => {
  const [passcode, setPasscode] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const dispatch = useDispatch();
  const GroupID = useSelector(
    (state) => state.group.selectedGroup.groupDetails.id
  );

  /*     Close out the modal entirely   */
  const closeModal = () => {
    dispatch(unSelectEditGroup());
    dispatch(deactivateModal());
  };

  /*    Move back to modal menu         */
  const changeModal = () => {
    dispatch(setModalPage("GroupMenu"));
  };

  /*   Process passcode change request  */
  const handleSubmit = () => {
    let PassObject = {
      GroupID: GroupID,
      newPass: passcode,
    };
    axios
      .post(`http://localhost:3005/api/groups/edit`, {
        PassObject,
      })
      .then((res) => {
        setDisplaySuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
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