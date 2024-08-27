import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FilterAccounts from "../FilterAccounts/FilterAccounts";
import { fetchUserAccounts } from "../../store/accounts";
import "./DashBoard.scss";

export default function DashBoard() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const accounts = useSelector((state) => state.accounts);

  const usersActions = Object.values(accounts).flatMap(account => account.actions || []);
  
  useEffect(() => {
    dispatch(fetchUserAccounts()).catch(setError);
  }, [dispatch]);

  if (!accounts || !user) {
    return <div className="dashboard"><strong>PLEASE LOGIN TO CONTINUE</strong></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function Actions() {
    return (
      <div className="account-filter">
        <div className="dashboard__accounts">
          <h4>Actions</h4>
          {usersActions.length > 0 ? (
            usersActions.map((action) => (
              <div key={action.id}>
                <NavLink to={`/account/${action.accountId}`}>
                  <p>Action: {action.report}</p>
                </NavLink>
              </div>
            ))
          ) : (
            <p>No actions available</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__accounts">
        <h4>Accounts</h4>
        {Object.values(accounts).length > 0 ? (
          Object.values(accounts).map((account) => (
            <div key={account.id}>
              <NavLink to={`/account/${account.id}`}>
                <p>Company Name: {account.companyName}</p>
              </NavLink>
            </div>
          ))
        ) : (
          <p>No accounts available</p>
        )}
      </div>
      <div className="account-filter">
        <FilterAccounts />
      </div>
      <div className="filter-cards">
        {usersActions.length > 0 ? (
          <Actions />
        ) : (
          <p>Loading actions...</p>
        )}
      </div>
    </div>
  );
}

