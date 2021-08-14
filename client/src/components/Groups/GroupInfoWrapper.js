import React, { useState } from "react";
import "../../styles/PageStyles/GroupPage.css";
import { FilterOtherUsers } from "../../components/Filters/FilterOtherUsers";
import { FilterColumn } from "../../components/Filters/FilterColumn";
import { IoInformationCircleOutline } from "react-icons/io5";
/**
 *
 * @PageLocation GroupPage
 * @Component GroupInfoWrapper
 * @Description Component display for group title, and memberlist
 *
 *
 */
export const GroupInfoWrapper = (props) => {
  const [groupInfo, setGroupInfo] = useState(false);
  return (
    <div className="GroupInfoWrapper">
      <div className="GroupInformation">
        <div
          className="GroupInformationBtn"
          onClick={() => setGroupInfo(!groupInfo)}
        >
          <IoInformationCircleOutline
            fontSize="1.5em"
            style={{ verticalAlign: "middle", marginRight: "0.3rem" }}
          />
          Group Info
        </div>
        <div
          className="GroupInfoBody"
          style={{ visibility: groupInfo ? "visible" : "hidden" }}
        >
          {props.canEditPage && (
            <>
              <FilterColumn />
            </>
          )}
          {!props.canEditPage && (
            <>
              <FilterOtherUsers />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
