import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../styles/GroupStyles/GroupModals.css";
/**
 *
 * @PageLocation ManageGroups
 * @Component AddSuccess
 * @Description Group creation success feedback modal. Links user to item addition page for the created group.
 *
 *
 */
export const AddSuccess = () => {
  const id = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  return (
    <>
      <div className="GroupRegisterHeader">
        <h1>Success!</h1>
      </div>
      <div className="GroupRegisterBody">
        Your group has been created.
        <button>Start adding items</button>
      </div>
    </>
  );
};
