import { csrfFetch } from "./csrf";

const LOAD_ACCOUNTS = "accounts/loadAccounts";
const USERS_ACCOUNTS = "accounts/userAccounts";
const FILTER_ACCOUNTS = "accounts/filterAccounts";
const CREATE_ACCOUNT = "accounts/createAccount"
const ACCOUNT_PROFILE = "accounts/accountProfile"
const ACCOUNT_ORDERS = "accounts/accountOrders";
const UPDATE_ACCOUNT = "accounts/updateAccount";
const CREATE_CONTACT = "accounts/createContact";
const CREATE_ACTION = "accounts/createAction";
const DELETE_ACTION = "accounts/deleteAction";
const DELETE_CONTACT = "accounts/deleteContact";
const UPDATE_CONTACT = "accounts/updateContact";
const DELETE_ACCOUNT = "accounts/deleteAccount"
const UPDATE_ACTION = "accounts/updateAction"

const updateAction = (payload) => ({
  type: UPDATE_ACTION,
  payload
})

const deleteAccount = (accountId) => ({
  type: DELETE_ACCOUNT,
  accountId
})

const updateContact = (payload) => ({
  type: UPDATE_CONTACT,
  payload
})

const deleteContact = (contactId) => ({
  type: DELETE_CONTACT,
  contactId
})

const deleteAction = (actionId) => ({
  type: DELETE_ACTION,
  actionId
})

const createAction = (payload) => ({
  type: CREATE_ACTION,
  payload
})

const createContact = (payload) => ({
  type: CREATE_CONTACT,
  payload
})

const updateAccount = (payload) => ({
  type: UPDATE_ACCOUNT,
  payload
})

const accountOrders = (orders) => ({
  type: ACCOUNT_ORDERS,
  payload: orders,
});


const accountProfile = (payload) => ({
  type: ACCOUNT_PROFILE,
  payload
})

const loadAccounts = (payload) => ({
  type: LOAD_ACCOUNTS,
  payload,
});

const userAccounts = (payload) => ({
  type: USERS_ACCOUNTS,
  payload,
});

const filterAccounts = (payload) => ({
  type: FILTER_ACCOUNTS,
  payload,
});

const createAccount = (payload) => ({
  type: CREATE_ACCOUNT,
  payload
});

export const fetchUpdateAction = (actionId, action) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/accounts/company/${actionId}/actions/${actionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action),
    });

    if (res.ok) {
      const newAction = await res.json();
      console.log({newAction})
      dispatch(updateAction(newAction));
      return newAction;
    }
  } catch (err) {
    console.error("Error updating action", err);
  }
}

export const fetchDeleteAccount = (accountId) => async (dispatch) => {
  const res = await csrfFetch(`/api/accounts/company/${accountId}`, {
    method: "DELETE"
  })
  dispatch(deleteAccount(accountId))
  return res
}

export const fetchUpdateContact = (contactId, contact) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/accounts/company/${contactId}/contacts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (res.ok) {
      const newContact = await res.json();
      console.log({newContact})
      dispatch(updateContact(newContact));
      return newContact;
    }
  } catch (err) {
    console.error("Error creating contact", err);
  }
};

//* Delete a contact by id
export const fetchDeleteContact = (contactId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/accounts/contacts/${contactId}`, {
      method: "DELETE"
  })
  dispatch(deleteContact(contactId))
  return res
}

//* Delete a action by id
export const fetchDeleteAction = (actionId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/accounts/actions/${actionId}`, {
      method: "DELETE"
  })
  dispatch(deleteAction(actionId))
  return res
}

export const fetchAccountOrders = (id) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/orders/${id}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data)
      dispatch(accountOrders(data));
    }
  } catch (err) {
    console.error("Error loading accounts", err);
  }
};

export const fetchAccountProfile = (id) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/accounts/company/${id}`);
    if (res.ok) {
      // console.log("Response OK:", res);
      
      // // Check headers and status
      // console.log("Headers:", res.headers);
      // console.log("Status:", res.status);

      // Parse the JSON data
      const data = await res.json();
      
      // Log the data to see what's being returned
      // console.log("Parsed Data:", data);
      
      // Dispatch the action with the data
      dispatch(accountProfile(data));
      return data;
    } else {
      console.error("Response not OK:", res.status, res.statusText);
    }
  } catch (err) {
    console.error("Error fetching Account Profile:", err);
  }
};

export const fetchCreateContact = (accountId, contact) => async (dispatch) => {
  try{
    const res = await csrfFetch(`/api/accounts/company/${accountId}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (res.ok) {
      const newContact = await res.json();
      console.log({newContact})
      dispatch(createContact(newContact));
      return newContact;
    }  } catch (err){
    console.error("Error creating contact", err);
  }
}

export const fetchCreateAction = (accountId, action) => async (dispatch) => {
  try{
    const res = await csrfFetch(`/api/accounts/company/${accountId}/actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action),
    });

    if (res.ok) {
      const newAction = await res.json();
      console.log({newAction})
      dispatch(createAction(newAction));
      return newAction;
    }  } catch (err){
    console.error("Error creating action", err);
  }
}


export const createNewAccount = (account) => async (dispatch) => { 
  try {
      const res = await csrfFetch("/api/accounts", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(account)
      })

      if (res.ok) {
          const newAccount = await res.json();
          dispatch(createAccount(newAccount));
          return newAccount
      }
  } catch (err) {
      console.error("Error creating spot", err);
  }
}

export const fetchUpdateAccount = (account) => async (dispatch) => { 
  try {
      const res = await csrfFetch(`/api/accounts/${account.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
    });


    if (res.ok) {
        const data = await res.json();

      console.log('Data',data)

        dispatch(updateAccount(account.id, data));
    } else {
        console.error("Failed to load album");
    }
  } catch (err) {
      console.error("Error creating spot", err);
  }
}

export const fetchFilterAccounts =
  (filterType, selection) => async (dispatch) => {
    let urlRoute;

    switch (filterType) {
      case "equipmentType":
        urlRoute = `/api/accounts/equipmentType/${encodeURIComponent(
          selection
        )}`;
        break;
      case "businessType":
        urlRoute = `/api/accounts/businessType/${encodeURIComponent(
          selection
        )}`;
        break;

      case "companyName":
        urlRoute = `/api/accounts/companyName/${encodeURIComponent(selection)}`;

        break;
      case "lookingFor":
        urlRoute = `/api/accounts/lookingFor/${encodeURIComponent(selection)}`;
        break;

      default:
        throw new Error("Invalid filter type");
    }
// console.log("URL Route", urlRoute)
    try {
      const response = await csrfFetch(urlRoute);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      // console.log("Filtered Data", data)
      dispatch(filterAccounts(data)); // Dispatch action with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

export const fetchUserAccounts = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/accounts/current");
    if (res.ok) {
      const data = await res.json();
      dispatch(userAccounts(data));
    }
  } catch (err) {
    console.error("Error loading accounts", err);
  }
};

const initialState = {
  accounts: {},
  orders: {},
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS: {
      const newState = {};
      action.payload.Accounts.forEach((account) => {
        newState[account.id] = account;
      });
      return { ...state, ...newState };
    }
    case USERS_ACCOUNTS: {
      const newState = {};
      action.payload.forEach((account) => {
        newState[account.id] = account;
      });

      return { ...newState };
    }
    case FILTER_ACCOUNTS: {
      const newState = {}
      action.payload.forEach(account => {
        newState[account.id] = account
      });
      return { ...newState}
    }
    case CREATE_ACCOUNT: {
      const newState = { ...state };
      const newAccount = action.payload;
      newState[newAccount.id] = newAccount;
      return newState
    }
    case ACCOUNT_PROFILE: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState
    }
    case ACCOUNT_ORDERS: {
      const orders = action.payload.orders;
      return {
        ...state,
        orders: {
          ...state.orders,
          ...orders,
        },
      };
    }
    case UPDATE_ACCOUNT: {
      console.log(action.payload)
      return {
          ...state,
           accounts: action.payload
      };
  }
  case CREATE_CONTACT: {
    const newState = { ...state }
    const newContact = action.payload;
    newState[newContact.id] = newContact;
    return newState;
  }
  case CREATE_ACTION: {
    const newState = { ...state }
    const newAction = action.payload;
    newState[newAction.id] = newAction;
    return newState;
  }
  case DELETE_ACTION: {
    const newState = { ...state };
    delete newState[action.actionId];
    return newState;
  }
  case DELETE_CONTACT: {
    const newState = { ...state };
    delete newState[action.contactId];
    return newState;
  }
  case UPDATE_CONTACT: {
    const updatedState = { ...state };
    updatedState[action.payload.id] = action.payload;
    return updatedState;
  }
  case DELETE_ACCOUNT: {
    const newState = { ...state };
    delete newState[action.accountId];
    return newState;
  }
  case UPDATE_ACTION: {
    const updatedState = { ...state };
    updatedState[action.payload.id] = action.payload;
    return updatedState;
  }

    default:
      return state;
  }
};

export default accountReducer;
