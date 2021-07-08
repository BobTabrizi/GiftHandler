import React, { useRef, useEffect } from "react";
import "../styles/Login.css";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
export const Login = () => {
  return (
    <>
      <div className="LoginContainer">
        <LoginForm />
      </div>
    </>
  );
};
