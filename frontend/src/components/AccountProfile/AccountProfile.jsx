import { useEffect, useState } from "react";
import { useParams, Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountProfile,
  fetchDeleteAction,
  fetchDeleteContact,
  fetchDeleteAccount,
} from "../../store/accounts";
import { fetchDeleteOrder } from "../../store/orders";
import "./AccountProfile.scss";

export default function AccountProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [isWeekFilter, setIsWeekFilter] = useState(true);
  const [isAllFilter, setIsAllFilter] = useState(false);
  const user = useSelector((state) => state.session.user);
  const acctId = parseInt(id);

  useEffect(() => {
    if (user) {
      dispatch(fetchAccountProfile(acctId))
        .then((response) => {
          if (response) {
            setProfile(response);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch account profile:", error);
        });
    }
  }, [dispatch, acctId, user]);

  if (!profile || !user) {
    return <div>Loading...</div>;
  }

  let usersActions;
  let accountContacts;

  if (profile.actions && profile.contacts) {
    usersActions = profile.actions.flatMap((action) => action);
    accountContacts = profile.contacts.flatMap((contact) => contact);
  }

  const handleRemoveAccount = async (e, accountId) => {
    e.preventDefault();
    try {
      await dispatch(fetchDeleteAccount(accountId));
      navigate("/");
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  //  Optimistic UI Update: After the deletion request, the local profile state is immediately updated to remove the deleted action, without waiting for a full refetch.
  //  This method does not require refetching the entire profile or actions list, making the UI more efficient and responsive.
  const handleRemoveContact = async (e, contactId) => {
    e.preventDefault();
    try {
      await dispatch(fetchDeleteContact(contactId));
      setProfile((prevProfile) => ({
        ...prevProfile,
        contacts: prevProfile.actions.filter(
          (contact) => contact.id !== contactId
        ),
      }));
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  function Contacts() {
    return (
      <div className="account-filter">
        <div className="dashboard__contacts">
          <h4>Contacts</h4>
          <NavLink to={`/account/${acctId}/contact`}>
            <button className="btn btn-primary btn-sm btn-icon-text">
              Add Contact
            </button>
          </NavLink>
          {accountContacts.length > 0 ? (
            accountContacts.map((contact) => (
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  margin: "10px 0",
                }}
                className="dashboard__accounts"
                key={contact.id}
              >
                <p>{contact.name}</p>
                <p>{contact.position}</p>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
                <NavLink to={`/account/${acctId}/update-contact/${contact.id}`}>
                  <button className="btn btn-primary btn-sm btn-icon-text">
                    Update
                  </button>
                </NavLink>
                <button
                  className="btn btn-delete btn-sm btn-icon-text"
                  onClick={(e) => handleRemoveContact(e, contact.id)}
                >
                  Remove Contact
                </button>
              </div>
            ))
          ) : (
            <p>No contacts available</p>
          )}
        </div>
      </div>
    );
  }

  //  Optimistic UI Update: After the deletion request, the local profile state is immediately updated to remove the deleted action, without waiting for a full refetch.
  //  This method does not require refetching the entire profile or actions list, making the UI more efficient and responsive.
  const handleRemoveAction = async (e, actionId) => {
    e.preventDefault();
    try {
      await dispatch(fetchDeleteAction(actionId));
      setProfile((prevProfile) => ({
        ...prevProfile,
        actions: prevProfile.actions.filter((action) => action.id !== actionId),
      }));
    } catch (err) {
      console.error("Failed to delete action:", err);
    }
  };

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
          <NavLink to={`/account/${acctId}/action`}>
            <button className="btn btn-primary btn-sm btn-icon-text">
              Add Action
            </button>
          </NavLink>
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
              usersActions.map((action) => (
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                  key={action.id}
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
                  <div className="btn-group">
                  <NavLink to={`/account/${acctId}/update-action/${action.id}`}>
                  <button className="btn btn-primary btn-sm btn-icon-text">
                    Update
                  </button>
                </NavLink>
                  <button
                    className="btn btn-delete btn-sm btn-icon-text"
                    onClick={(e) => handleRemoveAction(e, action.id)}
                  >
                    Remove Action
                  </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No actions available.</p>
            )
          ) : isWeekFilter ? (
            weekActions.length > 0 ? (
              weekActions.map((action) => (
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                  key={action.id}
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
                  <NavLink to={`/account/${acctId}/update-action/${action.id}`}>
                  <button className="btn btn-primary btn-sm btn-icon-text">
                    Update
                  </button>
                </NavLink>
                  <button
                    className="btn btn-delete btn-sm btn-icon-text"
                    onClick={(e) => handleRemoveAction(e, action.id)}
                  >
                    Remove Action
                  </button>
                </div>
              ))
            ) : (
              <p>No actions available within the next week.</p>
            )
          ) : monthActions.length > 0 ? (
            monthActions.map((action) => (
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  margin: "10px 0",
                }}
                key={action.id}
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
                <NavLink to={`/account/${acctId}/update-action/${action.id}`}>
                  <button className="btn btn-primary btn-sm btn-icon-text">
                    Update
                  </button>
                </NavLink>
                <button
                  className="btn btn-delete btn-sm btn-icon-text"
                  onClick={(e) => handleRemoveAction(e, action.id)}
                >
                  Remove Action
                </button>
              </div>
            ))
          ) : (
            <p>No actions available within the next month.</p>
          )}
        </div>
      </div>
    );
  }

  //  Optimistic UI Update: After the deletion request, the local profile state is immediately updated to remove the deleted action, without waiting for a full refetch.
  //  This method does not require refetching the entire profile or actions list, making the UI more efficient and responsive.
  const handleRemoveOrder = async (e, orderId) => {
    e.preventDefault();
    try {
      await dispatch(fetchDeleteOrder(orderId));
      setProfile((prevProfile) => ({
        ...prevProfile,
        orders: prevProfile.orders.filter((order) => order.id !== orderId),
      }));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__quotes">
        <span>Quotes</span>
        <Link to={`/create-order/${acctId}`}>
          <button className="btn btn-primary btn-sm btn-icon-text">
            Create Sales Order
          </button>
        </Link>
        {profile && profile.orders && profile.orders.length > 0 ? (
          profile.orders.map((order, index) => (
            <div className="quote-card" key={index}>
              <NavLink to={`/sales-order/${order.id}`}>
                <button>View</button>
                <p>VIN: {order.vin}</p>
              </NavLink>
              <NavLink to={`/account/${acctId}/update-order/${order.id}`}>
                <button>Update</button>
              </NavLink>
              <button
                className="btn btn-delete btn-sm btn-icon-text"
                onClick={(e) => handleRemoveOrder(e, order.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No quotes available.</p>
        )}
      </div>
      <div className="dashboard__profile">
        <div className="profile-header">
          <h3>Account Profile</h3>
          <div className="profile-buttons">
            <NavLink to={`/account/${acctId}/edit`}>
              <button className="btn btn-primary btn-sm btn-icon-text">
                Update Profile
              </button>
            </NavLink>
            <button
              className="btn btn-delete btn-sm btn-icon-text"
              onClick={(e) => handleRemoveAccount(e, profile.id)}
            >
              Delete Account
            </button>
          </div>
        </div>
        {user && profile ? (
          <div className="profile-info">
            <h2>{profile.companyName}</h2>
            <p>
              <strong>Vocation:</strong> {profile.businessType}
            </p>
            <p>
              <strong>Equipment:</strong> {profile.equipmentType}
            </p>
            <p>
              <strong>Fleet Size:</strong> {profile.fleetSize}
            </p>
            <p>
              <strong>Looking For:</strong> {profile.lookingFor}
            </p>
            <p>
              <strong>Phone #:</strong> {profile.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <span>
              <strong>Address:</strong> {profile.address}
            </span>
            <span>
              <strong>City:</strong> {profile.city}, <strong>ZIP Code:</strong>{" "}
              {profile.zipCode}
            </span>
          </div>
        ) : (
          <div>Must be logged in</div>
        )}
      </div>
      <div>
        <div className="filter-cards">
          {Object.values(profile).length > 0 ? (
            <Actions />
          ) : (
            <p>Loading actions...</p>
          )}
        </div>
        <div className="filter-cards">
          {Object.values(profile).length > 0 ? (
            <Contacts />
          ) : (
            <p>Loading contacts...</p>
          )}
        </div>
      </div>
    </div>
  );
}
