/**
 *
 * @PageLocation HomePage (AddGroupModal)
 * @Component ModeSelect
 * @Description Modal Component. Prompts users to select the type of group they wish to create
 *
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { setModalPage } from "../../../../actions/modalActions";
import { updateModalData } from "../../../../actions/modalActions";

export const ModeSelect = () => {
  //Save group modes in DB as single integers,
  //Current: 0 -> Secret Santa ; 1 -> Wedding ; 2 -> Other
  const [eventType, setEventType] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let ModalData = {
      GroupType: eventType,
    };
    dispatch(updateModalData(ModalData));

    dispatch(setModalPage("GroupImage"));
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
            onClick={() => setEventType(0)}
            defaultChecked
          />

          <div className="ModeInfo">
            <div className="ModeInfoHeader">
              <div className="ModeTitle">Secret Santa </div>
              <div className="ModeSize"> Group Size: 2+</div>
            </div>
            <div>
              The standard secret santa group. Requires at least 2 people and
              there must be an even number of people in the group.
            </div>
          </div>
        </div>
        <div className="ModeBtn">
          <input
            type="radio"
            className="radBtn"
            value="Wedding"
            onClick={() => setEventType(1)}
            name="groupmode"
          />{" "}
          <div className="ModeInfo">
            <div className="ModeInfoHeader">
              <div className="ModeTitle">Birthday/Wedding/Event </div>
              <div className="ModeSize"> Group Size: 1</div>
            </div>
            <div>
              For events which only one person (yourself) has a registry list.
              Your page will be viewable by link to others, even those without
              accounts.
            </div>
          </div>
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
