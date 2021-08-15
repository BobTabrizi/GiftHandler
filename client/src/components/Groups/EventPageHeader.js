import React from "react";
import { useSelector } from "react-redux";
import "../../styles/PageStyles/EventPage.css";
/**
 *
 * @PageLocation EventPage
 * @Component EventPageHeader
 * @Description Component display for event title, and memberlist
 *
 *
 */
export const EventPageHeader = (props) => {
  const PageInfo = useSelector((state) => state.group.pageGroup);
  return (
    <div className="EventHeader">
      <div className="EventUserInfo">
        <div className="EventUserName">{props.userName}</div>
        <div className="EventUserImage">
          <img
            height="100%"
            width="100%"
            src={`/api/images/${props.image}`}
            style={{ borderRadius: "50%" }}
          ></img>
        </div>
      </div>

      {PageInfo.name && <div className="EventName">{PageInfo.name}</div>}
      {PageInfo.description && <>{PageInfo.description.description}</>}
    </div>
  );
};
