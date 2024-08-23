import React from "react";
import "./Profile.scss"

const Profile = (props) => {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
          <div className="hstack gap-3">
            <button className="btn btn-light btn-sm btn-icon-text">
              <span className="text">Cancel</span>
            </button>
            <button
              onClick={props.handleSubmit}
              className="btn btn-primary btn-sm btn-icon-text"
            >
              <span className="text">Save</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {/* Company info */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h6 mb-4">Company Info</h3>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Company Name</label>
                      <input
                        name="companyName"
                        value={props.companyName}
                        onChange={props.handleChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Business Type</label>
                      <select
          className="form-select"
          value={props.businessType}
          onChange={props.handleChange}
          name="businessType"
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Fleet Size</label>
                      <input
                        name="fleetSize"
                        value={props.fleetSize}
                        onChange={props.handleChange}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <h2>Equipment Type</h2>
                    </label>

                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="equipmentType"
                          value="Dump Truck"
                          checked={
                            props.equipmentType &&
                            props.equipmentType.includes("Dump Truck")
                          }
                          onChange={props.handleChange}
                        />
                        Dump Truck
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="equipmentType"
                          value="Flatbed"
                          checked={
                            props.equipmentType &&
                            props.equipmentType.includes("Flatbed")
                          }
                          onChange={props.handleChange}
                        />
                        Flatbed
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="equipmentType"
                          value="Water Truck"
                          checked={
                            props.equipmentType &&
                            props.equipmentType.includes("Water Truck")
                          }
                          onChange={props.handleChange}
                        />
                        Water Truck
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="equipmentType"
                          value="Box Truck"
                          checked={
                            props.equipmentType &&
                            props.equipmentType.includes("Box Truck")
                          }
                          onChange={props.handleChange}
                        />
                        Box Truck
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="equipmentType"
                          value="Day Cab"
                          checked={
                            props.equipmentType &&
                            props.equipmentType.includes("Day Cab")
                          }
                          onChange={props.handleChange}
                        />
                        Day Cab
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="equipmentType"
                          value="Sleeper"
                          checked={
                            props.equipmentType &&
                            props.equipmentType.includes("Sleeper")
                          }
                          onChange={props.handleChange}
                        />
                        Sleeper
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <h2>Looking For</h2>
                    </label>

                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value="DumpTruck"
                          checked={
                            props.lookingFor &&
                            props.lookingFor.includes("DumpTruck")
                          }
                          onChange={props.handleChange}
                        />
                        Dump Truck
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value="FlatBed"
                          checked={
                            props.lookingFor &&
                            props.lookingFor.includes("FlatBed")
                          }
                          onChange={props.handleChange}
                        />
                        Flatbed
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value="WaterTruck"
                          checked={
                            props.lookingFor &&
                            props.lookingFor.includes("WaterTruck")
                          }
                          onChange={props.handleChange}
                        />
                        Water Trucks
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value="BoxTruck"
                          checked={
                            props.lookingFor &&
                            props.lookingFor.includes("BoxTruck")
                          }
                          onChange={props.handleChange}
                        />
                        Box Truck
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value="DayCab"
                          checked={
                            props.lookingFor &&
                            props.lookingFor.includes("DayCab")
                          }
                          onChange={props.handleChange}
                        />
                        Day Cab
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value="SleeperTruck"
                          checked={
                            props.lookingFor &&
                            props.lookingFor.includes("SleeperTruck")
                          }
                          onChange={props.handleChange}
                        />
                        Sleeper
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Basic information --> */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h6 mb-4">Contact information</h3>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">First name</label>
                      <input
                        name="firstName"
                        value={props.firstName}
                        onChange={props.handleChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Last name</label>
                      <input
                        name="lastName"
                        value={props.lastName}
                        onChange={props.handleChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        value={props.email}
                        onChange={props.handleChange}
                        type="email"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Phone number</label>
                      <input
                        name="phoneNumber"
                        value={props.phoneNumber}
                        onChange={props.handleChange}
                        type="tel"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Address --> */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h6 mb-4">Address</h3>
                <div className="mb-3">
                  <label className="form-label">Address Line 1</label>
                  <input
                    name="address"
                    value={props.address}
                    onChange={props.handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="col-lg-6"></div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">State</label>
                      <select
                        onChange={props.handleChange}
                        value={props.state}
                        name="state"
                        className="select2 form-control select2-hidden-accessible"
                        data-select2-placeholder="Select state"
                        data-select2-id="select2-data-4-680y"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <option data-select2-id="select2-data-6-cshs"></option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--bootstrap-5"
                        dir="ltr"
                        data-select2-id="select2-data-5-np4c"
                        style={{ width: "391px" }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabindex="0"
                            aria-disabled="false"
                            aria-labelledby="select2-2fn7-container"
                            aria-controls="select2-2fn7-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-2fn7-container"
                              role="textbox"
                              aria-readonly="true"
                              title="Select state"
                            >
                              <span className="select2-selection__placeholder">
                                Select state
                              </span>
                            </span>
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation"></b>
                            </span>
                          </span>
                        </span>
                        <span
                          className="dropdown-wrapper"
                          aria-hidden="true"
                        ></span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        name="city"
                        value={props.city}
                        onChange={props.handleChange}
                        className="select2 form-control select2-hidden-accessible"
                        data-select2-placeholder="Select city"
                        data-select2-id="select2-data-7-809c"
                        tabindex="-1"
                        aria-hidden="true"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">ZIP code</label>
                      <input
                        name="zipCode"
                        value={props.zipCode}
                        onChange={props.handleChange}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Right side --> */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="card-body">
                <h3 className="h6">Notes</h3>
                <textarea className="form-control" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;