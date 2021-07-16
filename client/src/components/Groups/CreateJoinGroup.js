import React, { useState } from "react";
import "../../styles/GroupPage.css";
import { GroupModal } from "../Groups/GroupModal";
/**
 * @PageLocation ManageGroup
 * @Component CreateJoinGroup
 * @Description Wrapper Component for Group Creation/Deletion
 *
 */
export const CreateJoinGroup = () => {
  const [showGroupJoin, setShowGroupJoin] = useState(false);
  const [showGroupCreate, setShowGroupCreate] = useState(false);
  return (
    <>
      <div className="GroupManageContainer">
        <div className="ActionButtons">
          <div>
            <button
              className="groupIdentifier"
              onClick={() => setShowGroupCreate(true)}
            >
              CREATE A GROUP
            </button>
          </div>
          <div>
            <button
              className="groupIdentifier"
              onClick={() => setShowGroupJoin(true)}
            >
              JOIN A GROUP
            </button>
          </div>
        </div>
        {showGroupCreate && (
          <GroupModal closeModal={setShowGroupCreate} modalType={"Create"} />
        )}
        {showGroupJoin && (
          <GroupModal closeModal={setShowGroupJoin} modalType={"Join"} />
        )}
      </div>
    </>
  );
};
