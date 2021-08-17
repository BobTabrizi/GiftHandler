/**
 *
 * @PageLocation HomePage (EditGroupModal)
 * @Component ChangeDescription
 * @Description  Enables user to edit and change a description for a specified group/event.
 *
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { deactivateModal } from "../../../../actions/modalActions";
import { EditGroupDetails } from "../../../../actions/groupActions";
import { unSelectEditGroup } from "../../../../actions/groupActions";

export const ChangeDescription = () => {
  const GroupDetails = useSelector(
    (state) => state.group.selectedGroup.groupDetails
  );
  const [eventInfo, setEventInfo] = useState(GroupDetails.description);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let GroupProperties = {
      DescObject: {
        GroupID: GroupDetails.groupid,
        Description: eventInfo,
      },
    };

    let Response = await dispatch(EditGroupDetails(GroupProperties));
    if (Response.status === 201) {
      setWasSuccessful(true);
    }
  };
  return (
    <>
      <div className="EditDescriptionBody">
        <div
          style={{
            display:
              wasSuccessful && wasSuccessful !== "Error" ? "none" : "block",
          }}
        >
          <p>{GroupDetails.groupname}</p>
          <textarea
            className="EventModalInput"
            rows="10"
            cols="50"
            value={eventInfo}
            onChange={(e) => setEventInfo(e.target.value)}
          ></textarea>
          <div style={{ textAlign: "center" }}>
            <button className="GroupRegisterBtn" onClick={() => handleSubmit()}>
              {" "}
              Confirm
            </button>
          </div>
        </div>

        <div style={{ display: wasSuccessful ? "block" : "none" }}>
          <div style={{ textAlign: "center" }}>
            <h1>Success!</h1>
          </div>
          <div className="EditDescriptionBody">
            The description for the group has been changed.
            <button
              className="EditDescriptionBtn"
              onClick={() => {
                dispatch(unSelectEditGroup());
                dispatch(deactivateModal());
              }}
            >
              {" "}
              Confirm
            </button>
          </div>
        </div>

        <div style={{ display: wasSuccessful === "Error" ? "block" : "none" }}>
          <div style={{ textAlign: "center" }}>
            <h1>Error</h1>
          </div>
          <div className="EditDescriptionBody">
            There was a problem changing the description. Please try again.
            <button
              className="EditDescriptionBtn"
              onClick={() => {
                setEventInfo(GroupDetails.description);
                setWasSuccessful(false);
              }}
            >
              {" "}
              Try Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
