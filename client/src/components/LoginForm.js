import React, { useRef, useEffect } from "react";
import "../styles/Login.css";
export const LoginForm = () => {
  return (
    <>
      <div className="LoginFormContainer">
        <h1>Gift Handler</h1>
        <form>
          <div className="form-inner">
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
