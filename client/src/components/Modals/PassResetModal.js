import React, { useEffect, useState } from "react";
import "../../styles/AuthFormStyles/AuthModals.css";
import { clearErrors } from "../../actions/errorActions";
import { useDispatch, useSelector } from "react-redux";
import { deactivateModal } from "../../actions/modalActions";
import { passResetRequest } from "../../actions/authActions";
/**
 * @PageLocation Login
 * @Component PassResetModal
 * @Description Prompts user for an email to send a password reset email.
 *
 */
export const PassResetModal = () => {
  const [email, setEmail] = useState("");
  const ActiveModal = useSelector((state) => state.modal.activeModal.modalType);
  const errorMsg = useSelector((state) => state.error.message);
  const [reqStatus, setReqStatus] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await dispatch(passResetRequest(email));
    if (response.status === 201) {
      setReqStatus(true);
    } else {
      setReqStatus(false);
    }
  };

  useEffect(() => {
    dispatch(clearErrors());
    const handleClick = (e) => {
      if (e.target && e.target.className === "PassResetModalBackground") {
        dispatch(deactivateModal());
      }
    };
    if (ActiveModal === "PassReset") {
      window.addEventListener("click", handleClick);
    }
  }, [ActiveModal]);

  return (
    <>
      <div className="PassResetModalBackground">
        <div className="PassResetContainer">
          <div className="PassResetHeader">
            <h1>Reset Password</h1>
            <button
              className="PassResetCloseBtn"
              onClick={() => dispatch(deactivateModal())}
            >
              X
            </button>
          </div>
          {errorMsg && <div>{errorMsg}</div>}
          <div
            className="PassResetBody"
            style={{ display: reqStatus === true ? "none" : "block" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-inner">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="submitButton">
                  <input
                    type="submit"
                    value="Submit"
                    style={{ width: 250, marginTop: "1rem" }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div
            className="PassResetSuccess"
            style={{ display: reqStatus === true ? "block" : "none" }}
          >
            Instructions have been sent to the email for reset.
            <button
              className="ResetSuccessBtn"
              onClick={() => dispatch(deactivateModal())}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
