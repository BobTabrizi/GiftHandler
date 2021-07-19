import React, { useState, useEffect } from "react";
import "../../styles/PageStyles/Login.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

/**
 *
 * @PageLocation Login
 * @Component LoginForm
 * @Description Login form that prompts user to login or register
 *
 */
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let errors = useSelector((state) => state.error.message);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <>
      <div className="LoginFormContainer">
        <h1>Gift Handler</h1>

        {errors && <div>{errors}</div>}

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
                value="LOGIN"
                style={{ width: 250, marginTop: "1rem" }}
              />
            </div>
          </div>
          <div className="registerFooter">
            <div>Don't have an account?</div>
            <Link to="/register" className="registerButton">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
