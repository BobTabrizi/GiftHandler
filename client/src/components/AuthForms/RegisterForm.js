import React, { useEffect, useState } from "react";
import "../../styles/Login.css";
import { returnErrors } from "../../actions/errorActions";
import { clearErrors } from "../../actions/errorActions";
import { register } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 *
 * @PageLocation Register
 * @Component RegisterForm
 * @Description Register form that prompts user to register or login
 *
 */
export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  let errors = useSelector((state) => state.error.message);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    //Dispatch store and create new user.
    dispatch(register(newUser));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <>
      <div className="RegisterFormContainer">
        <h1>Gift Handler</h1>
        {errors && <div>{errors}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <div className="form-group">
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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

            <div className="submitButton">
              <input
                type="submit"
                value="Register"
                style={{ width: 250, marginTop: "1rem" }}
              />
            </div>
            <div className="registerFooter">
              <div>Already have an account?</div>
              <Link to="/login" className="registerButton">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
