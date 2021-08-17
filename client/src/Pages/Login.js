/**
 *
 * @Page Login Page
 * @Description Log in the User or send to register page.
 * @route /login
 *
 */

import React from "react";
import "../styles/PageStyles/Login.css";
import { LoginForm } from "../components/Auth/LoginForm";

export const Login = () => {
  return (
    <>
      <div className="LoginContainer">
        <LoginForm />
      </div>
    </>
  );
};
