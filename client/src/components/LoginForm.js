import React, { useRef, useEffect, useState } from "react";
import "../styles/Login.css";
import { connect, useDispatch } from "react-redux";
import { login } from "../actions/authActions";
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };
    dispatch(login(user));
  };

  return (
    <>
      <div className="LoginFormContainer">
        <h1>Gift Handler</h1>
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

            <input type="submit" value="LOGIN" />
          </div>
        </form>
      </div>
    </>
  );
};
