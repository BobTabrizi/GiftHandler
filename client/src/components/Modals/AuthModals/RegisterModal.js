import React, { useEffect, useState } from "react";
import "../../../styles/AuthFormStyles/AuthModals.css";
import { clearErrors } from "../../../actions/errorActions";
import { register } from "../../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { deactivateModal } from "../../../actions/modalActions";
/**
 * @PageLocation Login
 * @Component RegisterModal
 * @Description Prompts users to register for an account
 *
 */
export const RegisterModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let errors = useSelector((state) => state.error.message);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    //Dispatch store and create new user.
    dispatch(register(newUser));
    dispatch(deactivateModal());
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <>
      <div className="RegisterModalBackground">
        <div className="RegisterModalContainer">
          <h1>Register</h1>
          {errors && <div>{errors}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-inner">
              <div className="form-group">
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="submitButton">
                <input
                  type="submit"
                  value="Register"
                  style={{ width: 250, marginTop: "1rem" }}
                />
              </div>
              <div className="registerFooter">
                <div>Already have an account?</div>
                <div
                  className="registerButton"
                  onClick={() => dispatch(deactivateModal())}
                >
                  Login
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
