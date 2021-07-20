import React from "react";
import { useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
import { Link } from "react-router-dom";
import { deactivateModal } from "../../../../actions/modalActions";
/**
 *
 * @PageLocation ManageGroups
 * @Component AddSuccess
 * @Description Group creation success feedback modal. Links user to item addition page for the created group.
 *
 *
 */
export const AddSuccess = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="GroupRegisterHeader">
        <h1>Success!</h1>
      </div>
      <div className="GroupRegisterBody">
        Your group has been created.
        <Link
          to={`/`}
          onClick={() => dispatch(deactivateModal())}
          style={{
            textDecoration: "none",
          }}
        >
          <button className="AddSuccessBtn">Start adding items</button>
        </Link>
      </div>
    </>
  );
};
