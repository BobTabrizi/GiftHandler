import React from "react";
import "../styles/Login.css";
import { LoginForm } from "../components/AuthForms/LoginForm";
export const Login = () => {
  return (
    <>
      <div className="LoginContainer">
        <LoginForm />
      </div>
    </>
  );
};
