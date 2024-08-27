import { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
// import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountProfile,
  fetchDeleteAction,
  fetchDeleteContact,
} from "../../store/accounts";
import { fetchDeleteOrder } from "../../store/orders";
import "./AccountProfile.scss";

export default function AccountProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const [profile, setProfile] = useState({});
  const [isWeekFilter, setIsWeekFilter] = useState(true);
  // const accounts = useSelector((state) => state.accounts);
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
              <div className="dashboard__accounts" key={contact.id}>
                <p>{contact.name}</p>
                <p>{contact.position}</p>
                <p>{contact.phone}</p>
                <button>Update</button>
                <button onClick={(e) => handleRemoveContact(e, contact.id)}>
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
          <br></br>
          <button onClick={() => setIsWeekFilter(true)}>Weekly</button>
          <button onClick={() => setIsWeekFilter(false)}>Monthly</button>
          {isWeekFilter ? (
            weekActions.length > 0 ? (
              weekActions.map((action) => (
                <div key={action.id}>
                  <NavLink to={`/account/${action.accountId}`}>
                    <p>
                      Action: {action.report}
                      <br></br>
                      <span>Due by: {action.reminder}</span>
                    </p>
                  </NavLink>
                  <button onClick={(e) => handleRemoveAction(e, action.id)}>
                    Remove Action
                  </button>{" "}
                </div>
              ))
            ) : (
              <p>No actions available within the next week.</p>
            )
          ) : monthActions.length > 0 ? (
            monthActions.map((action) => (
              <div key={action.id}>
                <NavLink to={`/account/${action.accountId}`}>
                  <p>
                    Action: {action.report}
                    <br></br>
                    <span>Due by: {action.reminder}</span>
                  </p>
                </NavLink>
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
            <div key={index}>
              <NavLink to={`/sales-order/${order.id}`}>
                <p>VIN: {order.vin}</p>
              </NavLink>
              <NavLink to={`/account/${acctId}/update-order/${order.id}`}>
                <button>Update</button>
              </NavLink>
              <button onClick={(e) => handleRemoveOrder(e, order.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No quotes available.</p>
        )}
      </div>
      <div className="dashboard__profile">
        <div>Account Profile</div>
        <NavLink to={`/account/${acctId}/edit`}>
          <button className="btn btn-primary btn-sm btn-icon-text">
            Update Profile
          </button>
        </NavLink>
        {user && profile ? (
          <>
            <h2>{profile.companyName}</h2>
            <p>Vocation: {profile.businessType}</p>
            <p>Equipment: {profile.equipmentType}</p>
            <p>Fleet Size: {profile.fleetSize}</p>
            <p>Looking For: {profile.lookingFor}</p>
            <p>Phone #: {profile.phoneNumber}</p>
            <p>Email: {profile.email}</p>
            <span>{profile.address}</span>
            <br></br>
            <span>
              {profile.city}, {profile.zipCode}
            </span>
          </>
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
            <p>Loading actions...</p>
          )}
        </div>
      </div>
    </div>
  );
}

