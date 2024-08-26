import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateOrder, fetchAccountOrders } from "../../store/orders";
import { csrfFetch } from "../../store/csrf";
import "./UpdateOrder.scss";

const UpdateOrder = () => {
  const { id, orderId } = useParams();
  const dispatch = useDispatch();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: null,
  });
  const [orderInfo, setOrderInfo] = useState({
    vin: "",
    model: "",
    year: "",
    condition: "",
    price: "",
    tax: "",
    license: "",
    bodies: "",
    extras: ""
  });
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const response = await csrfFetch(`/api/accounts/company/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCompanyInfo(data);
      const order = data.orders.find(order => order.id === parseInt(orderId));
      if (order) {
        setOrderInfo(order);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user, id, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      accountId: parseInt(id),
      ...orderInfo,
    };

    try {
      const updatedOrder = await dispatch(fetchUpdateOrder(orderId, payload));
      navigate(`/sales-order/${updatedOrder.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Update Sales Order</h1>
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
            value={orderInfo.vin}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={orderInfo.model}
            onChange={handleChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={orderInfo.year}
            onChange={handleChange}
          />
          <div className="condition-box">
            <label>
              <input
                type="checkbox"
                name="condition"
                value="New"
                checked={
                  orderInfo.condition &&
                  orderInfo.condition.includes("New")
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
                  orderInfo.condition &&
                  orderInfo.condition.includes("Used")
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
            value={orderInfo.price}
            onChange={handleChange}
          />
          <label>Body & Equipment</label>
          <input
            type="number"
            name="bodies"
            placeholder="Body"
            value={orderInfo.bodies}
            onChange={handleChange}
          />
          <label>Extra Items</label>
          <input
            type="number"
            name="extras"
            placeholder="Add Ons"
            value={orderInfo.extras}
            onChange={handleChange}
          />
          <label>Tax</label>
          <input
            type="number"
            name="tax"
            placeholder="Sales Tax"
            value={orderInfo.tax}
            onChange={handleChange}
          />
          <label>License Fee</label>
          <input
            type="text"
            name="license"
            placeholder="License Fee"
            value={orderInfo.license}
            onChange={handleChange}
          />
          <button className="create-button" type="submit">
            Update Order
          </button>
        </form>
      </header>
    </div>
  );
};

export default UpdateOrder;
