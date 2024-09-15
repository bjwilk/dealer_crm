import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { fetchUserAccounts } from "../../store/accounts";
import "./Navigation.scss";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(fetchUserAccounts());
    // closeMenu();
    navigate("/login");
  };

  return (
    <div id="navigation" className="navigation">
      {user && (
        <Link to={"/"}>
          <button>DashBoard</button>
        </Link>
      )}

      <Link to="/Login">{!user && <button>Login</button>}</Link>
      {user && (
        <Link to={"/CreateAccount"}>
          <button>Create Account</button>
        </Link>
      )}
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
}
