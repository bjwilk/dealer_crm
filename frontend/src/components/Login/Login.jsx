import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./Login.scss";

function Login() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};
    if (!credential)
      newErrors.credential = "Email or UserName name is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(sessionActions.login({ credential, password }));
      navigate("/");
    } catch (err){
      const data = await err.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
      console.error(errors.data.errors);
  }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await dispatch(
        sessionActions.login({ credential: "FakerUser1", password: "password" })
      );
      navigate("/");
    } catch (err) {
      console.error("Failed to log in as demo user:", err);
      setErrors({ demo: "Failed to log in as demo user. Please try again." });
    }
  };

  if (user) {
    return <div>Already logged in</div>;
  }

  return (
    <>
      <h1>Log In</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="input-field">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
            <p className="error-message">{errors.credential}</p>
          )}

        <label className="input-field">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </label>

        <div className="error-container">
          {errors.credential && errors.password && (
            <>
              <p className="error-message">
                Wrong Username or Email: {errors.credential}
              </p>
              <p className="error-message">Wrong Password: {errors.password}</p>
            </>
          )}
          {errors.credential && !errors.password && (
            <p className="error-message">
              Wrong Username or Email: {errors.credential}
            </p>
          )}
          {!errors.credential && errors.password && (
            <p className="error-message">
              The provided credentials were invalid: {errors.password}
            </p>
          )}
        </div>
        <br></br>
        <div className="button-group">
          <button
            className="form-button"
            type="submit"
          >
            Log In
          </button>
          <br></br>
          <button className="form-button" onClick={handleDemoLogin}>
            Demo User
          </button>
          <br></br>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
