import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Signup.scss";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false); // Added for async checking state

  let isButtonDisabled = username.length < 4 || password.length < 6 || !email.length || !confirmPassword.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Async validation for email and username
    setIsChecking(true); // To indicate the check is in progress
    try {
      const emailExists = await dispatch(sessionActions.checkEmailExists(email));
      const usernameExists = await dispatch(sessionActions.checkUsernameExists(username));

      if (emailExists) {
        newErrors.email = "Email already exists";
      }

      if (usernameExists) {
        newErrors.username = "Username already exists";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsChecking(false);
        return;
      }

      if (password !== confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        setIsChecking(false);
        return;
      }

      // Proceed with signup if no errors
      await dispatch(sessionActions.signup({ email, username, password }));
      navigate("/");

    } catch (error) {
      console.error("Error during signup process:", error);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        {errors.general && <p className="error-message">{errors.general}</p>}
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
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        <button className="form-button" disabled={isButtonDisabled || isChecking} type="submit">
          {isChecking ? "Checking..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}

export default SignUp;
