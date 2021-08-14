import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { addGroup } from "../../../../actions/groupActions";
import { setModalPage } from "../../../../actions/modalActions";
/**
 *
 * @PageLocation Home Page
 * @Component GroupRegister
 * @Description Modal Component. Credential form for group creation.
 *
 *
 */
export const GroupRegister = () => {
  const id = useSelector((state) => state.auth.user.id);
  const GroupData = useSelector((state) => state.modal.modalData);
  const [groupname, setGroupName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  /*   Handle Creation of Group */
  const handleSubmit = async () => {
    let GroupDetails = {
      groupName: groupname,
      passcode: passcode,
      userid: id,
      groupType: GroupData.GroupType,
      Description: GroupData.Description,
      groupImage: GroupData.GroupImage,
    };
    let resp = await dispatch(addGroup(GroupDetails));
    if (resp === "Success") {
      dispatch(setModalPage("AddSuccess"));
    } else {
      setErrors(resp);
    }
  };
  return (
    <>
      <div className="GroupRegisterHeader">
        <h1>Name and Passcode</h1>
      </div>
      <div className="GroupRegisterBody">
        {errors && <div>{errors}</div>}
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
      <div className="GroupRegisterFooter">
        <button className="GroupRegisterBtn" onClick={() => handleSubmit()}>
          {" "}
          Create Group
        </button>
      </div>
    </>
  );
};
