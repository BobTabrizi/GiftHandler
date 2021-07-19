import React from "react";
import "../styles/PageStyles/Login.css";
import { RegisterForm } from "../components/AuthForms/RegisterForm";

/**
 *
 * @Page Register Page
 * @Description Registration page. Logs in user after registering
 * @route /register
 *
 */
export const Register = () => {
  return (
    <>
      <div className="LoginContainer">
        <RegisterForm />
      </div>
    </>
  );
};
