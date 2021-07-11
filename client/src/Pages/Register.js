import React from "react";
import "../styles/Login.css";
import { RegisterForm } from "../components/RegisterForm";
export const Register = () => {
  return (
    <>
      <div className="LoginContainer">
        <RegisterForm />
      </div>
    </>
  );
};
