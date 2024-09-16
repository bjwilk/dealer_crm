import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateOrder } from "../../store/orders";
import { csrfFetch } from "../../store/csrf";
import "./UpdateOrder.scss";

const UpdateOrder = () => {
  const { id, orderId } = useParams();
  const acctId = parseInt(id);
  const dispatch = useDispatch();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
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
    extras: "",
  });
  const [errors, setErrors] = useState({});

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
      const order = data.orders.find((order) => order.id === parseInt(orderId));
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
    setErrors({});

    const newErrors = {};
    if (!orderInfo.vin) newErrors.vin = "VIN is required";
    if (!orderInfo.model) newErrors.model = "Model is required";
    if (!orderInfo.year) newErrors.year = "Year is required";
    if (!orderInfo.price) newErrors.price = "Price is required";
    if (!orderInfo.tax) newErrors.tax = "Tax is required";
    if (!orderInfo.license) newErrors.license = "License Fee is required";
    if (!orderInfo.condition) newErrors.condition = "New or Used is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
          {errors.vin && <p className="error-message">{errors.vin}</p>}

          <input
            type="text"
            name="model"
            placeholder="Model"
            value={orderInfo.model}
            onChange={handleChange}
          />
          {errors.model && <p className="error-message">{errors.model}</p>}

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={orderInfo.year}
            onChange={handleChange}
          />
          {errors.year && <p className="error-message">{errors.year}</p>}

          <div className="condition-box">
            <label>
              <input
                type="checkbox"
                name="condition"
                value="New"
                checked={
                  orderInfo.condition && orderInfo.condition.includes("New")
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
                  orderInfo.condition && orderInfo.condition.includes("Used")
                }
                onChange={handleChange}
              />
              Used
            </label>
            {errors.condition && (
              <p className="error-message">{errors.condition}</p>
            )}
          </div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={orderInfo.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}

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
          {errors.tax && <p className="error-message">{errors.tax}</p>}

          <label>License Fee</label>
          <input
            type="text"
            name="license"
            placeholder="License Fee"
            value={orderInfo.license}
            onChange={handleChange}
          />
          {errors.license && <p className="error-message">{errors.license}</p>}

          <button className="create-button" type="submit">
            Update Order
          </button>
          <NavLink to={`/account/${acctId}`}>
            <button className="btn btn-primary btn-sm btn-icon-text">Cancel</button>
          </NavLink>
        </form>
      </header>
    </div>
  );
};

export default UpdateOrder;
