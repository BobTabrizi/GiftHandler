import React, { useState } from "react";
import "../../styles/GroupPage.css";
import { CreateJoinModal } from "../Modals/CreateJoinModal";
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
          <CreateJoinModal
            closeModal={setShowGroupCreate}
            modalType={"Create"}
          />
        )}
        {showGroupJoin && (
          <CreateJoinModal closeModal={setShowGroupJoin} modalType={"Join"} />
        )}
      </div>
    </>
  );
};
