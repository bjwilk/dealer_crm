import React, { useEffect } from "react";
import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
// import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAccountOrders, fetchAccountProfile } from "../../store/accounts";
import './AccountProfile.scss'

export default function AccountProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const profile = useSelector((state) => state.accounts[id]);
  const user = useSelector(state => state.session.user)

console.log(profile)
  const acctId = parseInt(id)

// useEffect(() => {
// dispatch(fetchAccountOrders())
// },[])

  // const fetchAccounts = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/api/accounts/company/${acctId}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await response.json();
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   if(user && profile && user.id === profile.ownerId){

  //     fetchAccounts();
  //   }
  // }, []);


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
      </div>
    </div>
  );
  
  
}