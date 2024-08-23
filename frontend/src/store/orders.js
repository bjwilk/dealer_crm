import { act } from "react";
import { csrfFetch } from "./csrf";

const LOAD_ORDERS = "orders/loadOrders";
const USERS_ORDERS = "orders/userOrders";
const CREATE_ORDER = "orders/createOrder";
// const FILTER_ACCOUNTS = "accounts/filterAccounts";
// const CREATE_ACCOUNT = "accounts/createAccount"
// const ACCOUNT_PROFILE = "accounts/accountProfile"

// const accountProfile = (id) => ({
//   type: ACCOUNT_PROFILE,
//   payload: account
// })

// const loadOrders = (payload) => ({
//   type: LOAD_ORDERS,
//   payload,
// });

const accountOrders = (id) => ({
  type: ACCOUNT_ORDERS,
  payload,
});

// const filterAccounts = (payload) => ({
//   type: FILTER_ACCOUNTS,
//   payload,
// });

const createOrder = (payload) => ({
  type: CREATE_ORDER,
  payload,
});

// export const fetchAccountProfile = (id) => async (dispatch) => {
//   console.log(parseInt(id))
//   try{
//     const res = await csrfFetch(`api/accounts/company/${id}`);
//     if(res.ok){
//       const data = await res.json();
//       dispatch(accountProfile(data))
//     }
//   }catch (err){
//     console.error("Error fetching Account Profile", err)
//   }
// }

export const createNewOrder = (accountId, order) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/accounts/company/${accountId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      const newOrder = await res.json();
      console.log({newOrder})
      dispatch(createOrder(newOrder));
      return newOrder;
    }
  } catch (err) {
    console.error("Error creating order", err);
  }
};

export const fetchAccountOrders = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/accounts/:accountId/orders");
    if (res.ok) {
      const data = await res.json();
      console.log("Fetch Orders", data)
      dispatch(accountOrders(data));
    }
  } catch (err) {
    console.error("Error loading accounts", err);
  }
};

const initialState = {};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER: {
      const newState = { ...state }
      const newOrder = action.payload;
      newState[newOrder.id] = newOrder;
      return newState;
    }
    default:
      return state;
  }
};

export default orderReducer;
