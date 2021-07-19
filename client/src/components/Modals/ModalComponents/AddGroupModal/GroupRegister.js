import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { addGroup } from "../../../../actions/groupActions";
import { deactivateModal } from "../../../../actions/modalActions";
/**
 *
 * @PageLocation ManageGroups
 * @Component GroupRegister
 * @Description Modal Component. Credential form for group creation.
 *
 *
 */
export const GroupRegister = () => {
  const id = useSelector((state) => state.auth.user.id);
  const GroupMode = useSelector(
    (state) => state.modal.modalData.addGroupSettings.Mode
  );
  const [groupname, setGroupName] = useState("");
  const [passcode, setPasscode] = useState("");
  const dispatch = useDispatch();
  /*   Handle Creation of Group */
  const handleSubmit = () => {
    let GroupDetails = {
      groupName: groupname,
      passcode: passcode,
      userid: id,
      groupMode: GroupMode,
    };
    dispatch(addGroup(GroupDetails));
    dispatch(deactivateModal());
  };
  return (
    <>
      <div className="GroupRegisterHeader">
        <h1>Create a Group</h1>
      </div>
      <div className="GroupRegisterBody">
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
      </div>
      <div className="footer">
        <div className="modalCreateButton">
          <button
            style={{ fontSize: 22, cursor: "pointer" }}
            onClick={() => handleSubmit()}
          >
            {" "}
            Create Group
          </button>
        </div>
      </div>
    </>
  );
};
