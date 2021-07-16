import React from "react";
import "../styles/Login.css";
import { LoginForm } from "../components/AuthForms/LoginForm";

/**
 *
 * @Page Login Page
 * @Description Log in the User or send to register page.
 * @route /login
 *
 */
export const Login = () => {
  return (
    <>
      <div className="LoginContainer">
        <LoginForm />
      </div>
    </>
  );
};
