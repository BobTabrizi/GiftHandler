import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGroupMember } from "../../../../actions/groupActions";
import { deactivateModal } from "../../../../actions/modalActions";
import "../../../../styles/GroupStyles/GroupModals.css";

/**
 *
 * @PageLocation GroupPage
 * @Component JoinRegister
 * @Description Modal Component for the Edit Group Modal
 *
 *
 */
export const JoinRegister = () => {
  const id = useSelector((state) => state.auth.user.id);
  const [passcode, setPasscode] = useState(0);
  const [groupname, setGroupName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addGroupMember(groupname, passcode, id));
    dispatch(deactivateModal());
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>JOIN A GROUP</div>
        <div>
          <p>Enter a group name</p>
          <input
            className="modalInput"
            placeholder="Enter name"
            onChange={(e) => setGroupName(e.target.value)}
          ></input>
        </div>
        <div>
          <p>Enter the group passcode</p>
          <input
            className="modalInput"
            placeholder="Enter Passcode"
            onChange={(e) => setPasscode(e.target.value)}
          ></input>
        </div>
        <button
          style={{ marginTop: "10%", cursor: "pointer" }}
          onClick={() => handleSubmit()}
        >
          Join Group
        </button>
      </div>
    </>
  );
};
