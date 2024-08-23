import { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
// import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../../store/accounts";
import './AccountProfile.scss'

export default function AccountProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  // const accounts = useSelector((state) => state.accounts);
  const user = useSelector(state => state.session.user)
  const acctId = parseInt(id)

  useEffect(() => {
    if (user) {
      dispatch(fetchAccountProfile(acctId)).then((response) => {
        if (response) {
          setProfile(response);
        }
      }).catch((error) => {
        console.error("Failed to fetch account profile:", error);
      });
    }
  }, [dispatch, acctId, user]);

  if (!profile || !user) {
    return <div>Loading...</div>;
  }

  let usersActions;
  let accountContacts;
 
  if (profile.actions && profile.contacts){
   usersActions = profile.actions.flatMap(action => action)
  accountContacts = profile.contacts.flatMap(contact => contact)
  }

  function Contacts() {
    return (
      <div className="account-filter">
        <div className="dashboard__accounts">
          <h4>Contacts</h4>
          {accountContacts.length > 0 ? (
            accountContacts.map((contact) => (
              <div key={contact.id}>
                  <p>{contact.name}</p>
                  <p>{contact.position}</p>
                  <p>{contact.phone}</p>
              </div>
            ))
          ) : (
            <p>No contacts available</p>
          )}
        </div>
      </div>
    );
  }

  function Actions() {
    return (
      <div className="account-filter">
        <div className="dashboard__accounts">
          <h4>Actions</h4>
          {usersActions.length > 0 ? (
            usersActions.map((action) => (
              <div key={action.id}>
                <NavLink>
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
      <div className="dashboard__quotes">
        <span>Quotes</span>
        <Link to={`/create-order/${acctId}`}><button>Create Sales Order</button></Link>
        {profile && profile.orders && profile.orders.length > 0 ? (
          profile.orders.map((order, index) => (
            <div key={index}>
              <NavLink to={`/sales-order/${order.id}`}>
                <p>VIN: {order.vin}</p>
              </NavLink>
            </div>
          ))
        ) : (
          <p>No quotes available.</p>
        )}
      </div>
      <div className="dashboard__profile">
        <div>Account Profile</div>
        <button>Update Account</button>
        {user && profile ? (
          <>
            <h2>{profile.companyName}</h2>
            <p>Vocation: {profile.businessType}</p>
            <p>Equipment: {profile.equipmentType}</p>
            <p>Fleet Size: {profile.fleetSize}</p>
            <p>Looking For: {profile.lookingFor}</p>
            <p>Phone #: {profile.phoneNumber}</p>
            <p>City: {profile.city}</p>
          </>
        ) : (
          <div>Must be logged in</div>
        )}
              <div className="filter-cards">
        {Object.values(profile).length > 0 ? (
          <Contacts />
        ) : (
          <p>Loading actions...</p>
        )}
      </div>

      </div>
      <div className="filter-cards">
        {Object.values(profile).length > 0 ? (
          <Actions />
        ) : (
          <p>Loading actions...</p>
        )}
      </div>
    </div>
  );
  
  
}