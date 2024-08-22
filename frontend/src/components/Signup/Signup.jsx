import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Signup.scss"


function SignUp(){
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const { closeModal } = useModal();

  let isButtonDisabled;
  if (username.length < 4 || password.length < 6) {
    isButtonDisabled = true;
  } else if (
    !email.length ||
    !confirmPassword.length
  ) {
    isButtonDisabled = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
        })
      )
        .then(navigate('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="input-field">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="input-field">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
        <label className="input-field">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <label className="input-field">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
        <button
          className="form-button"
          disabled={isButtonDisabled}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUp;