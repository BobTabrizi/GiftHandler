import React, { useRef, useEffect, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3005/users/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
