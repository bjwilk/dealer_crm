import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// import dayjs from "dayjs";
import FilterAccounts from "../FilterAccounts/FilterAccounts";
import AccountProfile from "../AccountProfile/AccountProfile";
// import { AccountContext } from "../App";
import { fetchUserAccounts } from "../../store/accounts";
import "./DashBoard.scss";

export default function DashBoard() {
  // const [account, setAccount] = useContext(AccountContext);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const accounts = useSelector((state) => state.accounts);

  const usersActions = Object.values(accounts).flatMap(action => action.actions)
  console.log("Accounts:", usersActions)

  function Actions(){

    return(
      <div className="account-filter">
        <div className="dashboard__accounts">
        <h4>Actions</h4>
        {user &&
          accounts &&
          usersActions.map((action) => (
            <div key={action.id}>
              <NavLink to={`/account/${action.accountId}`}>
                <p>Action: {action.report}</p>
                </NavLink>
            </div>
          ))}
      </div>
      </div>
    )
  }

  useEffect(() => {
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  if (!accounts) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__accounts">
        <h4>Accounts</h4>
        {user &&
          accounts &&
          Object.values(accounts).map((account) => (
            <div key={account.id}>
              <NavLink to={`/account/${account.id}`}>
                <p>Company Name: {account.companyName}</p>
              </NavLink>
            </div>
          ))}
      </div>
      <div className="account-filter">
        {Object.values(accounts).length > 0 ? (
          <FilterAccounts />
        ) : (
          <FilterAccounts />
        )}
      </div>
      <div className="filter-cards">
        {Object.values(accounts).length > 0 ? (
          <Actions />
        ) : (
          <Actions />
        )}
      </div>

    </div>
  );
  
}
