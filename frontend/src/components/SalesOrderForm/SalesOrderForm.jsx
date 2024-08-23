import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../../context/OrderContext";
import "./SalesOrderForm.scss";
import { useSelector, useDispatch } from "react-redux";
import { createNewOrder } from "../../store/orders";
import { csrfFetch } from "../../store/csrf";

const SalesOrderForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: null,
    email: "",
    bodies: 0,
    extras: 0,
  });
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { orderDetails, handleChange } = useContext(OrderContext);

  const acctId = parseInt(id);

  const fetchAccounts = async () => {
    try {
      const response = await csrfFetch(`/api/accounts/company/${acctId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log({ data });
      setCompanyInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      accountId: acctId,
      ...orderDetails,
    };

    let newOrder;
    try {
      const newOrder = await dispatch(createNewOrder(acctId, payload));
      navigate(`/sales-order/${newOrder.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Sales Order</h1>
        <form className="company" onSubmit={handleSubmit}>
          <h3>Bill To:</h3>
          <span>{companyInfo.companyName}</span>
          <span>{companyInfo.address}</span>
          <p>
            {companyInfo.city}, {companyInfo.state} {companyInfo.zipCode}
          </p>
          <input
            type="text"
            name="vin"
            placeholder="VIN"
            value={orderDetails.vin}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={orderDetails.model}
            onChange={handleChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={orderDetails.year}
            onChange={handleChange}
          />
          <div className="condition-box">
            <label>
              <input
                type="checkbox"
                name="condition"
                value="New"
                checked={
                  orderDetails.condition &&
                  orderDetails.condition.includes("New")
                }
                onChange={handleChange}
              />
              New
            </label>
            <label>
              <input
                type="checkbox"
                name="condition"
                value="Used"
                checked={
                  orderDetails.condition &&
                  orderDetails.condition.includes("Used")
                }
                onChange={handleChange}
              />
              Used
            </label>
          </div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={orderDetails.price}
            onChange={handleChange}
          />
          <label>Body & Equipment</label>
          <input
            type="number"
            name="bodies"
            placeholder="Body"
            value={orderDetails.bodies}
            onChange={handleChange}
          />
          <label>Extra Items</label>
          <input
            type="number"
            name="extras"
            placeholder="Add Ons"
            value={orderDetails.extras}
            onChange={handleChange}
          />
          <label>Tax</label>
          <input
            type="number"
            name="tax"
            placeholder="Sales Tax"
            value={orderDetails.tax}
            onChange={handleChange}
          />
          <label>License Fee</label>
          <input
            type="text"
            name="license"
            placeholder="License Fee"
            value={orderDetails.license}
            onChange={handleChange}
          />
          <button className="create-button" type="submit">
            Create Order
          </button>
        </form>
      </header>
    </div>
  );
};

export default SalesOrderForm;
