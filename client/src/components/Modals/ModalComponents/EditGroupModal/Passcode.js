import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { unSelectEditGroup } from "../../../../actions/groupActions";
import { setActiveModal } from "../../../../actions/modalActions";
import "../../../../styles/Modal.css";
import { IoArrowBack } from "react-icons/io5";
/**
 *
 * @PageLocation GroupPage
 * @Component Passcode
 * @Description Modal Component for the Edit Group Modal
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
    dispatch(setActiveModal("Main"));
  };

  /*    Move back to modal menu         */
  const changeModal = () => {
    dispatch(setActiveModal("Main"));
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
      <div style={{ display: displaySuccess ? "none" : "block" }}>
        <div className="EditPasscodeHeader">
          <div>
            <IoArrowBack
              onClick={() => changeModal()}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>Change Passcode</div>
          <div></div>
        </div>
        <div style={{ marginTop: "15%" }}>
          <input
            className="modalInput"
            placeholder="Enter a New Passcode"
            onChange={(e) => setPasscode(e.target.value)}
          ></input>
        </div>
        <div style={{ marginTop: "10%" }}>
          <div className="SubmitPasscode">
            <button
              style={{ fontSize: 22, cursor: "pointer" }}
              onClick={() => handleSubmit()}
            >
              Submit
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
