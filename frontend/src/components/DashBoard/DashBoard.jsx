import { useState, useEffect } from "react";
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
  const [isWeekFilter, setIsWeekFilter] = useState(true);
  const [isAllFilter, setIsAllFilter] = useState(false);

  // Calculate usersActions only when accounts are available
  const usersActions = accounts && Object.values(accounts).length > 0
    ? Object.values(accounts).flatMap((account) => account.actions || [])
    : [];

  // UseEffect to fetch accounts
  useEffect(() => {
    dispatch(fetchUserAccounts()).catch(setError);
  }, [dispatch, ]);

  // If accounts are not loaded or user is not available
  if (!accounts || !user) {
    return (
      <div className="dashboard">
        <div className="dashboard__not-user">
          <strong>PLEASE LOGIN TO CONTINUE</strong>
        </div>
      </div>
    );
  }

  // Handle errors
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Calculate filtered actions based on selected filter
  function getFilteredActions() {
    const currentTime = new Date();
    if (isAllFilter) {
      return usersActions; // No filter applied, show all actions
    }

    const dateLimit = new Date();
    if (isWeekFilter) {
      // Set filter for one week
      dateLimit.setDate(currentTime.getDate() + 7);
    } else {
      // Set filter for one month
      dateLimit.setDate(currentTime.getDate() + 30);
    }

    return usersActions
    .filter((action) => {
      const actionDate = new Date(action.reminder);
      return actionDate >= currentTime && actionDate <= dateLimit;
    })
    .sort((a, b) => new Date(a.reminder) - new Date(b.reminder));
    
  }

  const filteredActions = getFilteredActions(); // Actions filtered based on the selected option

  // Sort actions based on reminder date
  const sortedActions = filteredActions.sort((a, b) => {
    const dateA = new Date(a.reminder);
    const dateB = new Date(b.reminder);
    return dateA - dateB; // Ascending order
  });
  
  
  // Rendering the Actions
  function Actions() {
    return (
      <div className="dashboard__actions">
        <h4>Actions</h4>
        <br />
        <button
          onClick={() => {
            setIsWeekFilter(true);
            setIsAllFilter(false);
          }}
        >
          Weekly
        </button>
        <button
          onClick={() => {
            setIsWeekFilter(false);
            setIsAllFilter(false);
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => {
            setIsWeekFilter(false);
            setIsAllFilter(true);
          }}
        >
          All
        </button>

        {sortedActions.length > 0 ? (
          sortedActions.map((action, index) => (
            <ul key={action.id || index}>
              <NavLink to={`/account/${action.accountId}`}>
                <li
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                >
                  <p>
                    <strong>Action:</strong> {action.report}
                  </p>
                  <p>
                    <strong>Details:</strong> {action.details}
                  </p>
                  <span>
                    <strong>Due by:</strong> {action.reminder}
                  </span>
                </li>
              </NavLink>
            </ul>
          ))
        ) : (
          <p>No actions available for this filter.</p>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__accounts">
        <h4>Accounts</h4>
        {Object.values(accounts).length > 0 ? (
          <ul>
            {Object.values(accounts).map((account, index) => (
              <li key={account.id || index}>
                <NavLink to={`/account/${account.id}`}>
                  <p>Company Name: {account.companyName}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>No accounts available</p>
        )}
      </div>
      <div className="account-filter">
        <FilterAccounts />
      </div>
      <div className="filter-cards">
        {usersActions ? <Actions /> : <p>Loading actions...</p>}
      </div>
    </div>
  );
}
