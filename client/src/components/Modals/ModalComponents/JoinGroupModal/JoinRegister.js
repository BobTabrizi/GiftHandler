/**
 *
 * @PageLocation Home Page
 * @Component JoinRegister
 * @Description Modal Component for the Edit Group Modal
 *
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGroupMember } from "../../../../actions/groupActions";
import { deactivateModal } from "../../../../actions/modalActions";
import "../../../../styles/GroupStyles/GroupModals.css";

export const JoinRegister = () => {
  const id = useSelector((state) => state.auth.user.id);
  const [passcode, setPasscode] = useState(0);
  const [groupname, setGroupName] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let AddResponse = await dispatch(addGroupMember(groupname, passcode, id));

    if (AddResponse === "Success") {
      dispatch(deactivateModal());
    } else {
      setError(AddResponse);
    }
  };

  return (
    <>
      <div className="JoinContainer">
        <div className="JoinBody">
          {error && <div>{error}</div>}
          <div className="JoinInput">
            <p>Enter a group name</p>
            <input
              className="JoinModalInput"
              placeholder="Enter name"
              onChange={(e) => setGroupName(e.target.value)}
            ></input>
          </div>
          <div className="JoinInput">
            <p>Enter the group passcode</p>
            <input
              className="JoinModalInput"
              placeholder="Enter Passcode"
              onChange={(e) => setPasscode(e.target.value)}
            ></input>
          </div>
        </div>
        <button className="JoinButton" onClick={() => handleSubmit()}>
          Join Group
        </button>
      </div>
    </>
  );
};
