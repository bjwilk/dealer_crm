import { act } from "react";
import { csrfFetch } from "./csrf";

// const LOAD_ORDERS = "orders/loadOrders";
const USERS_ORDERS = "orders/accountOders";
const CREATE_ORDER = "orders/createOrder";
const UPDATE_ORDER = "orders/updateOrder";
const DELETE_ORDER = "orders/deleteOrder";
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

// const filterAccounts = (payload) => ({
//   type: FILTER_ACCOUNTS,
//   payload,
// });

const accountOrders = (orderId) => ({
  type: USERS_ORDERS,
  orderId,
});

const createOrder = (payload) => ({
  type: CREATE_ORDER,
  payload,
});

const updateOrder = (payload) => ({
  type: UPDATE_ORDER,
  payload
})

const deleteOrder = (orderId) => ({
  type: DELETE_ORDER,
  orderId
})

export const fetchAccountOrders = (orderId) => async (dispatch) => {
  console.log("FETCH ODRER")
  try{
    const res = await csrfFetch(`api/accounts/orders/${orderId}`);
    if(res.ok){
      const data = await res.json();
      console.log("Orders:", data)
      dispatch(accountOrders(data))
    }
  }catch (err){
    console.error("Error fetching Order", err)
  }
}

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

export const fetchUpdateOrder = (orderId, order) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/accounts/company/${orderId}/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      const newOrder = await res.json();
      console.log({newOrder})
      dispatch(updateOrder(newOrder));
      return newOrder;
    }
  } catch (err) {
    console.error("Error creating order", err);
  }
};

export const fetchDeleteOrder = (orderId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/accounts/orders/${orderId}`, {
      method: "DELETE",
    });

    dispatch(deleteOrder(orderId))
    return res
  } catch (err) {
    console.error("Error deleting order", err);
  }
};


// export const fetchAccountOrders = () => async (dispatch) => {
//   try {
//     const res = await csrfFetch("/api/accounts/:accountId/orders");
//     if (res.ok) {
//       const data = await res.json();
//       console.log("Fetch Orders", data)
//       dispatch(accountOrders(data));
//     }
//   } catch (err) {
//     console.error("Error loading accounts", err);
//   }
// };

const initialState = {};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER: {
      const newState = { ...state }
      const newOrder = action.payload;
      newState[newOrder.id] = newOrder;
      return newState;
    }
    case UPDATE_ORDER: {
      const updatedState = { ...state };
      updatedState[action.payload.id] = action.payload;
      return updatedState;

  }
  case USERS_ORDERS: {
    const newState = {};
    console.log(action.payload)
    action.payload.orders?.forEach(order => {
      newState[order.id] = order
    })
    return newState;
  }
  case DELETE_ORDER: {
    const newState = { ...state}
    delete newState[action.orderId];
    return newState;
  }
    default:
      return state;
  }
};

export default orderReducer;
