import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { ModalProvider } from "./context/Modal";
import { OrderProvider } from "./context/OrderContext";
import './landing-css/landing.css'
import './sass/style.scss'


const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <OrderProvider>
        <App  />
        </OrderProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);
