import React, { useRef, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
export const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
    axios
      .post("http://localhost:3005/users/register", {
        name: "Fred",
        email: "Flintstone@hotmail.uk",
        password: "Pass",
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="name" name="name" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>

            <input type="submit" value="LOGIN" />
          </div>
        </form>
      </div>
    </>
  );
};
