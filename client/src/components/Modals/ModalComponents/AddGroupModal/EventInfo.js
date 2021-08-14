import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import {
  setModalPage,
  updateModalData,
} from "../../../../actions/modalActions";
/**
 *
 * @PageLocation Home Page
 * @Component EventInfo
 * @Description Modal Component during group creation.
 *              Prompts user for optional additional information to be displayed on event page.
 *
 */
export const EventInfo = () => {
  const id = useSelector((state) => state.auth.user.id);
  const ModalDetails = useSelector((state) => state.modal.modalData);
  const [eventInfo, setEventInfo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let ModalData = {
      GroupType: ModalDetails.GroupType,
      GroupImage: ModalDetails.GroupImage,
      Description: eventInfo,
    };
    dispatch(updateModalData(ModalData));
    dispatch(setModalPage("GroupRegister"));
  };
  return (
    <>
      <div className="GroupRegisterHeader">
        <h1>Event Bio</h1>
      </div>
      <div className="GroupRegisterBody">
        <p>Enter Information about your event</p>
        <textarea
          className="EventModalInput"
          rows="10"
          cols="50"
          placeholder="Enter a short message/description you'd like others to see"
          onChange={(e) => setEventInfo(e.target.value)}
        ></textarea>
      </div>
      <div className="GroupRegisterFooter">
        <button className="GroupRegisterBtn" onClick={() => handleSubmit()}>
          {" "}
          Confirm
        </button>
      </div>
    </>
  );
};
