import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState({
    vin: "",
    model: "",
    year: "",
    price: 0,
    tax: 0,
    license: 0,
    bodies: 0 ,
    extras: 0,
    notes: "",
    condition: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };



  return (
    <OrderContext.Provider
      value={{
        orderDetails,
        handleChange,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

