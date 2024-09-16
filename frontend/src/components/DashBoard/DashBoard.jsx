import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FilterAccounts from "../FilterAccounts/FilterAccounts";
import { fetchUserAccounts } from "../../store/accounts";
import "./DashBoard.scss";

// Dashboard
export default function DashBoard() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const accounts = useSelector((state) => state.accounts);
  const [isWeekFilter, setIsWeekFilter] = useState(true);
  const [isAllFilter, setIsAllFilter] = useState(false);


  const usersActions = Object.values(accounts).flatMap(
    (account) => account.actions || []
  );

  useEffect(() => {
    dispatch(fetchUserAccounts()).catch(setError);
  }, [dispatch]);

  if (!accounts || !user) {
    return (
      <div className="dashboard">
        <div className="dashboard__not-user">
        <strong>PLEASE LOGIN TO CONTINUE</strong>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function Actions() {
    const filterWeekActions = () => {
      const currentTime = new Date();
      const oneWeekFromNow = new Date(currentTime);
      oneWeekFromNow.setDate(currentTime.getDate() + 7);

      return usersActions.filter((action) => {
        const actionDate = new Date(action.reminder);
        return actionDate >= currentTime && actionDate <= oneWeekFromNow;
      });
    };
    const filterMonthActions = () => {
      const currentTime = new Date();
      const oneMonthFromNow = new Date(currentTime);
      oneMonthFromNow.setDate(currentTime.getDate() + 30);

      return usersActions.filter((action) => {
        const actionDate = new Date(action.reminder);
        return actionDate >= currentTime && actionDate <= oneMonthFromNow;
      });
    };
    const weekActions = filterWeekActions();
    const monthActions = filterMonthActions();


    return (
      <div className="account-filter">
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
          {isAllFilter ? (
            usersActions.length > 0 ? (
              usersActions.map((action, index) => (
                <>
                <NavLink to={`/account/${action.accountId}`}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                  key={action.id || index}
                >
                  <p>
                    <strong>Action:</strong> {action.report}
                  </p>
                  <br />
                  <p>
                    <strong>Details:</strong> {action.details}
                  </p>
                  <br />
                  <span>
                    <strong>Due by:</strong> {action.reminder}
                  </span>
                </div>
                </NavLink>
                </>
              ))
            ) : (
              <p>No actions available.</p>
            )
          ) : isWeekFilter ? (
            weekActions.length > 0 ? (
              weekActions.map((action, index) => (
                <>
                <NavLink to={`/account/${action.accountId}`}>

                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                  key={action.id || index}
                >
                  <p>
                    <strong>Action:</strong> {action.report}
                  </p>
                  <br />
                  <p>
                    <strong>Details:</strong> {action.details}
                  </p>
                  <br />
                  <span>
                    <strong>Due by:</strong> {action.reminder}
                  </span>
                </div>
                </NavLink>
                </>
              ))
            ) : (
              <p>No actions available within the next week.</p>
            )
          ) : monthActions.length > 0 ? (
            monthActions.map((action, index) => (
              <>
              <NavLink to={`/account/${action.accountId}`}>

              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  margin: "10px 0",
                }}
                key={action.id || index}
              >
                <p>
                  <strong>Action:</strong> {action.report}
                </p>
                <br />
                <p>
                  <strong>Details:</strong> {action.details}
                </p>
                <br />
                <span>
                  <strong>Due by:</strong> {action.reminder}
                </span>
              </div>
              </NavLink>
              </>
          ))
          ) : (
            <p>No actions available within the next month.</p>
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
          <ul>
            {Object.values(accounts).map((account, index) => {
              return (
                <li key={account.id || index}>
                  {/* fixed key prop error */}
                  <NavLink to={`/account/${account.id}`}>
                    <p>Company Name: {account.companyName}</p>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No accounts available</p>
        )}
      </div>
      <div className="account-filter">
        <FilterAccounts />
      </div>
      <div className="filter-cards">
        {usersActions.length > 0 ? <Actions /> : <p>Loading actions...</p>}
      </div>
    </div>
  );
}

