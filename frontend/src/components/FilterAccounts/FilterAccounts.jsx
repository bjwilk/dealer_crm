import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterAccounts } from "../../store/accounts";

function FilterAccounts() {
  const dispatch = useDispatch();
  const [equipment, setEquipment] = useState("");
  const [business, setBusiness] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [lookingFor, setLookingFor] = useState("");


  const handleSelect = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case "equipment":
        setEquipment(value);
        dispatch(fetchFilterAccounts("equipmentType", value));
        break;
      case "business":
        setBusiness(value);
        dispatch(fetchFilterAccounts("businessType", value))
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "lookingFor":
        setLookingFor(value);
        dispatch(fetchFilterAccounts("lookingFor", value))
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchFilterAccounts("companyName", companyName));
  };

  return (
    <div className="container">
      <div className="filter-cards">
        <h3>Search by Equipment Type</h3>
        <select
          className="form-select"
          value={equipment}
          onChange={handleSelect}
          name="equipment"
        >
          <option defaultValue>Open this select menu</option>
          <option value="Dump Truck">Dump Truck</option>
          <option value="Flatbed">Flatbed</option>
          <option value="Water Truck">Water Truck</option>
          <option value="Box Truck">Box Truck</option>
          <option value="Day Cab">Day Cab</option>
          <option value="Sleeper">Sleeper</option>
          <option value="Service Truck">Service Truck</option>
        </select>
      </div>
      <div className="filter-cards">
        <h3>Search by Business Type</h3>
        <select
          className="form-select"
          value={business}
          onChange={handleSelect}
          name="business"
        >
          <option defaultValue>Open this select menu</option>
          <option value="Construction">Construction</option>
          <option value="Moving">Moving</option>
          <option value="Delivery">Delivery</option>
          <option value="Freight Hauling">Freight Hauling</option>
          <option value="Landscaping">Landscaping</option>
          <option value="Transport">Transport</option>
        </select>
      </div>
      <div className="filter-cards">
        <h3>Search by Company Name</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            value={companyName}
            onChange={handleSelect}
            type="text"
            name="companyName"
            placeholder="Enter company name"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="filter-cards">
        <h3>Search by Looking For</h3>
        <select
          className="form-select"
          value={lookingFor}
          onChange={handleSelect}
          name="lookingFor"
        >
          <option defaultValue>Open this select menu</option>
          <option value="Dump Truck">Dump Truck</option>
          <option value="FlatBed">Flatbeds</option>
          <option value="Water Truck">Water Trucks</option>
          <option value="BoxT ruck">Box Trucks</option>
          <option value="Day Cab">Day Cab</option>
          <option value="Sleeper">Sleepers</option>
          <option value="Service Truck">Service Trucks</option>
        </select>
      </div>
    </div>
  );
}

export default FilterAccounts;
