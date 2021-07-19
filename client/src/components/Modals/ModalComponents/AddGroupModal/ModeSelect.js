import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { setModalPage } from "../../../../actions/modalActions";
import { updateModalData } from "../../../../actions/modalActions";
/**
 *
 * @PageLocation ManageGroups
 * @Component ModeSelect
 * @Description Modal Component. Prompts users to select the type of group they wish to create
 *
 *
 */
export const ModeSelect = () => {
  //Save group modes in DB as single integers,
  //Current: 0 -> Secret Santa ; 1 -> Wedding ; 2 -> Other
  const [radioState, setRadioState] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let GroupSettings = {
      Mode: radioState,
    };
    dispatch(updateModalData(GroupSettings));
    dispatch(setModalPage("GroupRegister"));
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>Pick a type of Group</h2>
      </div>
      <div className="ModeSelectBody">
        <div className="ModeBtn">
          <input
            type="radio"
            className="radBtn"
            value="Secret Santa"
            name="groupmode"
            onClick={() => setRadioState(0)}
            defaultChecked
          />
          Secret Santa
          <div className="ModeInfo">Group Size: Any</div>
        </div>
        <div className="ModeBtn">
          <input
            type="radio"
            className="radBtn"
            value="Wedding"
            onClick={() => setRadioState(1)}
            name="groupmode"
          />{" "}
          Wedding
          <div className="ModeInfo">Group Size: 1</div>
        </div>
        <div className="ModeBtn">
          <input
            type="radio"
            className="radBtn"
            value="Other"
            onClick={() => setRadioState(2)}
            name="groupmode"
          />{" "}
          Other
          <div className="ModeInfo">Group Size: Any</div>
        </div>
      </div>
      <div className="ModeSelectFooter">
        <button className="ModeSelectBtn" onClick={() => handleSubmit()}>
          Choose Mode
        </button>
      </div>
    </>
  );
};
