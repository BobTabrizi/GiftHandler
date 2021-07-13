import React, { useEffect, useState } from "react";
import "../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../actions/groupActions";
import { addGroupMember } from "../actions/groupActions";
export const GroupModal = ({ closeModal, modalType }) => {
  const id = useSelector((state) => state.auth.user.id);
  const [groupname, setGroupName] = useState("");
  const [passcode, setPasscode] = useState("");
  const dispatch = useDispatch();

  //TODO, add notification of succesful group generation to user
  const handleSubmit = () => {
    if (modalType === "Create") {
      dispatch(addGroup(groupname, passcode, id));
      closeModal(false);
    } else {
      dispatch(addGroupMember(groupname, passcode, id));
      closeModal(false);
    }
  };

  let bodyPrompts;
  if (modalType === "Create") {
    bodyPrompts = (
      <>
        <p>Enter a name for your group</p>
        <input
          className="modalInput"
          placeholder="Enter name"
          onChange={(e) => setGroupName(e.target.value)}
        ></input>
        <p>Enter a passcode for your group</p>
        <input
          className="modalInput"
          placeholder="Enter Passcode"
          onChange={(e) => setPasscode(e.target.value)}
        ></input>
      </>
    );
  } else {
    bodyPrompts = (
      <>
        <p>Enter a group name</p>
        <input
          className="modalInput"
          placeholder="Enter name"
          onChange={(e) => setGroupName(e.target.value)}
        ></input>
        <p>Enter the group passcode</p>
        <input
          className="modalInput"
          placeholder="Enter Passcode"
          onChange={(e) => setPasscode(e.target.value)}
        ></input>
      </>
    );
  }

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="modalCloseButton">
            <button onClick={() => closeModal(false)} style={{ fontSize: 22 }}>
              X
            </button>
          </div>
          <div className="header">
            <h1>{modalType} a Group!</h1>
          </div>
          <div className="body">{bodyPrompts}</div>
          <div className="footer">
            <div className="modalCreateButton">
              <button
                style={{ fontSize: 22, cursor: "pointer" }}
                onClick={() => handleSubmit()}
              >
                {modalType} Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
