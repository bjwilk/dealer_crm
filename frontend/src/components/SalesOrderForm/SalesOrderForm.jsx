import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../../context/OrderContext";
import "./SalesOrderForm.scss";
import { useSelector, useDispatch } from "react-redux";
import { createNewOrder } from "../../store/orders";
import { csrfFetch } from "../../store/csrf";

const SalesOrderForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { orderDetails, handleChange } = useContext(OrderContext);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: null,
  });
  const [errors, setErrors] = useState({});
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
    setErrors({})

    const newErrors = {};
    if (!orderDetails.vin) newErrors.vin = "VIN is required";
    if (!orderDetails.model) newErrors.model = "Model is required";
    if (!orderDetails.year) newErrors.year = "Year is required";
    if (!orderDetails.price) newErrors.price = "Price is required";
    if (!orderDetails.tax) newErrors.tax = "Tax is required";
    if (!orderDetails.license) newErrors.license = "License Fee is required";
    if (!orderDetails.condition) newErrors.condition = "New or Used is required";


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const payload = {
      accountId: acctId,
      ...orderDetails,
    };

    let newOrder;
    try {
      newOrder = await dispatch(createNewOrder(acctId, payload));
      navigate(`/sales-order/${newOrder.id}`);
    } catch (err) {
      const data = await err.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
      console.error(errors.data.errors);
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
           {errors.vin && <p className="error-message">{errors.vin}</p>}
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={orderDetails.model}
            onChange={handleChange}
          />
           {errors.model && <p className="error-message">{errors.model}</p>}
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={orderDetails.year}
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
            {errors.condition && <p className="error-message">{errors.condition}</p>}
          </div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={orderDetails.price}
            onChange={handleChange}
          />
           {errors.price && <p className="error-message">{errors.price}</p>}
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
           {errors.tax && <p className="error-message">{errors.tax}</p>}
          <label>License Fee</label>
          <input
            type="text"
            name="license"
            placeholder="License Fee"
            value={orderDetails.license}
            onChange={handleChange}
          />
           {errors.license && <p className="error-message">{errors.license}</p>}
          <button className="create-button" type="submit">
            Create Order
          </button>
        </form>
      </header>
    </div>
  );
};

export default SalesOrderForm;
