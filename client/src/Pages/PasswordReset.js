import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PageStyles/PasswordReset.css";
import { useDispatch } from "react-redux";
import { passResetProcess } from "../actions/authActions";
/**
 *
 * @Page PasswordReset
 * @Description Reset a user's password
 * @route /resetPassword/:PageID
 *
 */
export const PasswordReset = (props) => {
  const PID = props.match.params.id;
  const dispatch = useDispatch();
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reqStatus, setReqStatus] = useState(false);
  const [msg, SetMsg] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await dispatch(
      passResetProcess(PID, resetCode, newPassword)
    );
    if (response.status === 201) {
      setReqStatus(true);
    } else {
      setReqStatus(false);
    }
    SetMsg(response.data);
  };

  return (
    <>
      <div className="ResetPageContainer">
        <div className="ResetPageBody">
          <h1>Password Reset</h1>
          {msg && <div>{msg}</div>}
          <div
            className="ResetForm"
            style={{ display: reqStatus === true ? "none" : "block" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="reset-form-inner">
                <div className="reset-form-group">
                  <input
                    type="code"
                    name="code"
                    id="resetCode"
                    placeholder="Reset Code"
                    onChange={(e) => setResetCode(e.target.value)}
                  />
                </div>
                <div className="reset-form-group">
                  <input
                    type="password"
                    name="password"
                    id="resetPassword"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="submitButton">
                  <input
                    type="submit"
                    value="Change Password"
                    style={{ width: 250, marginTop: "1rem" }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div
            className="ResetSuccess"
            style={{ display: reqStatus === true ? "block" : "none" }}
          >
            <h4>You can now close this window or click the button below.</h4>
            <Link to={"/login"}>
              <button style={{ cursor: "pointer" }}>
                Click here to go to the login page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
