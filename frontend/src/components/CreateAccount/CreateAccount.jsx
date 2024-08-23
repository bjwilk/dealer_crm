import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewAccount } from "../../store/accounts";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../Profile/Profile";

const CreateAccount = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bread, setBread] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    businessType: "",
    equipmentType: "",
    fleetSize: 1,
    lookingFor: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: 0,
  });

  const showToast = () => {
    toast.success("Profile saved successfully!");
  };

  // useEffect(() => {
  //   toast("Company Added!");
  // }, []);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setAddressInfo((pre) => ({ ...pre, firstName: e.target.value }));
        break;
      case "lastName":
        setAddressInfo((pre) => ({ ...pre, lastName: e.target.value }));
        break;
      case "companyName":
        setAddressInfo((pre) => ({ ...pre, companyName: e.target.value }));
        break;
      case "equipmentType":
        const { name, value, checked } = e.target;

        if (name === "equipmentType") {
          setAddressInfo((prev) => {
            return {
              ...prev,
              equipmentType: checked
                ? [...prev.equipmentType, value]
                : prev.equipmentType.filter((item) => item !== value),
            };
          });
        }

        break;

      case "email":
        setAddressInfo((pre) => ({ ...pre, email: e.target.value }));
        break;
      case "businessType":
        setAddressInfo((pre) => ({ ...pre, businessType: e.target.value }));
        break;
      case "lookingFor":
        setAddressInfo((pre) => ({ ...pre, lookingFor: e.target.value }));
        break;
      case "fleetSize":
        setAddressInfo((pre) => ({ ...pre, fleetSize: e.target.value }));
        break;
      case "phoneNumber":
        setAddressInfo((pre) => ({ ...pre, phoneNumber: e.target.value }));
        break;
      case "address":
        setAddressInfo((pre) => ({ ...pre, address: e.target.value }));
        break;
      case "address2":
        setAddressInfo((pre) => ({ ...pre, address2: e.target.value }));
        break;
      case "city":
        setAddressInfo((pre) => ({ ...pre, city: e.target.value }));
        break;
      case "state":
        setAddressInfo((pre) => ({ ...pre, state: e.target.value }));
        break;
      case "zipCode":
        setAddressInfo((pre) => ({ ...pre, zipCode: e.target.value }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedEquipmentType = addressInfo.equipmentType.toString();

    const payload = {
      ownerId: user.id,
      ...addressInfo,
      equipmentType: processedEquipmentType, // Ensure this is a string
    };

    console.log(payload);
    let newAccount;
    try {
      const newAccount = await dispatch(createNewAccount(payload));
      // setBread(true);
      // showToast();  
      navigate(`/account/${newAccount.id}`);
    } catch (err) {
      if (err.response) {
        // If the error is an HTTP response
        const data = await err.response.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      } else {
        // Handle other types of errors (e.g., network errors)
        // setErrors(["An unexpected error occurred. Please try again."]);
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(addressInfo, "in here HS dashboard ");
  //   const newaccount = {...addressInfo}
  //   console.log('New Account', newaccount)
  //   let avalue = newaccount.equipmentType;
  //   newaccount.equipmentType = JSON.stringify(avalue)
  //   console.log('New Account Equipment', newaccount.equipmentType)
  //   fetch("http://localhost:3002/accounts", {
  //     method: "Post",
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
  //     },
  //     body: JSON.stringify(newaccount),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((results) => {
  //       showToast(true);

  //       console.log(results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      {bread && <ToastContainer />}
      <Profile
        handleSubmit={handleSubmit}
        firstName={addressInfo.firstName}
        businessType={addressInfo.businessType}
        handleChange={handleChange}
        lastName={addressInfo.lastName}
        equipmentType={addressInfo.equipmentType}
        companyName={addressInfo.companyName}
        fleetSize={addressInfo.fleetSize}
        lookingFor={addressInfo.lookingFor}
        email={addressInfo.email}
        phoneNumber={addressInfo.phoneNumber}
        address={addressInfo.address}
        city={addressInfo.city}
        zipCode={addressInfo.zipCode}
      />
    </>
  );
};

// function CreateAccount({ account }) {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();
//   const [addressInfo, setAddressInfo] = useState({
//     companyName: "",
//     firstName: "",
//     lastName: "",
//     businessType: "",
//     equipmentType:"",
//     fleetSize: 1,
//     lookingFor: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     address2: "",
//     city: "",
//     state: "",
//     zipCode: 0,
//   });

//   // useEffect(() => {
//   //   toast("Company Added!");
//   // }, []);

//   const handleChange = (e) => {
//     console.log(addressInfo, e.target.name);
//     switch (e.target.name) {
//       case "firstName":
//         setAddressInfo((pre) => ({ ...pre, firstName: e.target.value }));
//         break;
//       case "lastName":
//         setAddressInfo((pre) => ({ ...pre, lastName: e.target.value }));
//         break;
//       case "companyName":
//         setAddressInfo((pre) => ({ ...pre, companyName: e.target.value }));
//         break;
//         case "equipmentType":
//           const { name, value, checked } = e.target;

//           if (name === "equipmentType") {
//               setAddressInfo((prev) => {
//                   return { ...prev, equipmentType: checked ? [...prev.equipmentType, value] : prev.equipmentType.filter(item => item !== value) }

//               });
//           }

//           break;

//       case "email":
//         setAddressInfo((pre) => ({ ...pre, email: e.target.value }));
//         break;
//       case "businessType":
//         setAddressInfo((pre) => ({ ...pre, businessType: e.target.value }));
//         break;
//       case "lookingFor":
//         setAddressInfo((pre) => ({ ...pre, lookingFor: e.target.value }));
//         break;
//       case "fleetSize":
//         setAddressInfo((pre) => ({ ...pre, fleetSize: e.target.value }));
//         break;
//       case "phoneNumber":
//         setAddressInfo((pre) => ({ ...pre, phoneNumber: e.target.value }));
//         break;
//       case "address":
//         setAddressInfo((pre) => ({ ...pre, address: e.target.value }));
//         break;
//       case "address2":
//         setAddressInfo((pre) => ({ ...pre, address2: e.target.value }));
//         break;
//       case "city":
//         setAddressInfo((pre) => ({ ...pre, city: e.target.value }));
//         break;
//       case "state":
//         setAddressInfo((pre) => ({ ...pre, state: e.target.value }));
//         break;
//       case "zipCode":
//         setAddressInfo((pre) => ({ ...pre, zipCode: e.target.value }));
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     const payload = {
//       ownerId: user.id,
//       address,
//       city,
//       state,
//       zipCode,
//       companyName,
//       businessType,
//       phoneNumber,
//       equipmentType,
//       fleetSize,
//       lookingFor,
//       firstName,
//       lastName,
//       email,
//     };

//     let newAccount;
//     try {
//       newAccount = await dispatch(createNewAccount(payload));

//       navigate(`/account/${newAccount.id}`);
//     } catch (err) {
//       const data = await err.json();
//       if (data?.errors) {
//         setErrors(data.errors);
//       }
//     }
//   };

//   if (!user) {
//     return <p>Please Login</p>;
//   }

//   // return (
//   //   <>
//   //   <Profile />
//   //   </>
//   // )

//   // return (
//   //   <div className="container-fluid">
//   //     <div className="container">
//   //       <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
//   //         <div className="hstack gap-3">
//   //           <button className="btn btn-light btn-sm btn-icon-text">
//   //             <span className="text">Cancel</span>
//   //           </button>
//   //           <button
//   //             onClick={handleSubmit}
//   //             className="btn btn-primary btn-sm btn-icon-text"
//   //           >
//   //             <span className="text">Save</span>
//   //           </button>
//   //         </div>
//   //       </div>

//   //       <div className="row">
//   //         <div className="col-lg-8">
//   //           {/* Company info */}
//   //           <div className="card mb-4">
//   //             <div className="card-body">
//   //               <h3 className="h6 mb-4">Company Info</h3>
//   //               <div className="row">
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">Company Name</label>
//   //                     <input
//   //                       name="companyName"
//   //                       value={companyName}
//   //                       onChange={handleChange}
//   //                       type="text"
//   //                       className="form-control"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">Business Type</label>
//   //                     <select
//   //                       className="form-select"
//   //                       value={businessType}
//   //                       onChange={handleSelect}
//   //                       name="business"
//   //                     >
//   //                       <option defaultValue>Open this select menu</option>
//   //                       <option value="Construction">Construction</option>
//   //                       <option value="Moving">Moving</option>
//   //                       <option value="Delivery">Delivery</option>
//   //                       <option value="Freight Hauling">Freight Hauling</option>
//   //                       <option value="Landscaping">Landscaping</option>
//   //                       <option value="Transport">Transport</option>
//   //                     </select>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //               <div className="row">
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">Fleet Size</label>
//   //                     <input
//   //                       name="fleetSize"
//   //                       value={fleetSize}
//   //                       onChange={(e) => setLookingFor(e.target.value)}
//   //                       type="number"
//   //                       className="form-control"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //                 <div className="mb-3">
//   //                   <label className="form-label">
//   //                     <h2>Equipment Type</h2>
//   //                   </label>

//   //                   <div>
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="equipmentType"
//   //                         value="Dump Truck"
//   //                         checked={
//   //                           equipmentType &&
//   //                           equipmentType.includes("Dump Truck")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Dump Truck
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="equipmentType"
//   //                         value="Flatbed"
//   //                         checked={
//   //                           equipmentType && equipmentType.includes("Flatbed")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Flatbed
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="equipmentType"
//   //                         value="Water Truck"
//   //                         checked={
//   //                           equipmentType &&
//   //                           equipmentType.includes("Water Truck")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Water Truck
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="equipmentType"
//   //                         value="Box Truck"
//   //                         checked={
//   //                           equipmentType && equipmentType.includes("Box Truck")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Box Truck
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="equipmentType"
//   //                         value="Day Cab"
//   //                         checked={
//   //                           equipmentType && equipmentType.includes("Day Cab")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Day Cab
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="equipmentType"
//   //                         value="Sleeper"
//   //                         checked={
//   //                           equipmentType && equipmentType.includes("Sleeper")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Sleeper
//   //                     </label>
//   //                   </div>
//   //                 </div>
//   //                 <div className="mb-3">
//   //                   <label className="form-label">
//   //                     <h2>Looking For</h2>
//   //                   </label>

//   //                   <div>
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="lookingFor"
//   //                         value="DumpTruck"
//   //                         checked={
//   //                           lookingFor && lookingFor.includes("DumpTruck")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Dump Truck
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="lookingFor"
//   //                         value="FlatBed"
//   //                         checked={lookingFor && lookingFor.includes("FlatBed")}
//   //                         onChange={handleChange}
//   //                       />
//   //                       Flatbed
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="lookingFor"
//   //                         value="WaterTruck"
//   //                         checked={
//   //                           lookingFor && lookingFor.includes("WaterTruck")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Water Trucks
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="lookingFor"
//   //                         value="BoxTruck"
//   //                         checked={
//   //                           lookingFor && lookingFor.includes("BoxTruck")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Box Truck
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="lookingFor"
//   //                         value="DayCab"
//   //                         checked={lookingFor && lookingFor.includes("DayCab")}
//   //                         onChange={handleChange}
//   //                       />
//   //                       Day Cab
//   //                     </label>
//   //                     <br />
//   //                     <label>
//   //                       <input
//   //                         type="checkbox"
//   //                         name="lookingFor"
//   //                         value="SleeperTruck"
//   //                         checked={
//   //                           lookingFor && lookingFor.includes("SleeperTruck")
//   //                         }
//   //                         onChange={handleChange}
//   //                       />
//   //                       Sleeper
//   //                     </label>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>

//   //           {/* <!-- Basic information --> */}
//   //           <div className="card mb-4">
//   //             <div className="card-body">
//   //               <h3 className="h6 mb-4">Contact information</h3>
//   //               <div className="row">
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">First name</label>
//   //                     <input
//   //                       name="firstName"
//   //                       value={firstName}
//   //                       onChange={handleChange}
//   //                       type="text"
//   //                       className="form-control"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">Last name</label>
//   //                     <input
//   //                       name="lastName"
//   //                       value={lastName}
//   //                       onChange={handleChange}
//   //                       type="text"
//   //                       className="form-control"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //               <div className="row">
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">Email</label>
//   //                     <input
//   //                       name="email"
//   //                       value={email}
//   //                       onChange={handleChange}
//   //                       type="email"
//   //                       className="form-control"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">Phone number</label>
//   //                     <input
//   //                       name="phoneNumber"
//   //                       value={phoneNumber}
//   //                       onChange={handleChange}
//   //                       type="tel"
//   //                       className="form-control"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>
//   //           {/* <!-- Address --> */}
//   //           <div className="card mb-4">
//   //             <div className="card-body">
//   //               <h3 className="h6 mb-4">Address</h3>
//   //               <div className="mb-3">
//   //                 <label className="form-label">Address Line 1</label>
//   //                 <input
//   //                   name="address"
//   //                   value={address}
//   //                   onChange={handleChange}
//   //                   type="text"
//   //                   className="form-control"
//   //                 />
//   //               </div>
//   //               <div className="row">
//   //                 <div className="col-lg-6"></div>
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">State</label>
//   //                     <select
//   //                       onChange={handleChange}
//   //                       value={state}
//   //                       name="state"
//   //                       className="select2 form-control select2-hidden-accessible"
//   //                       data-select2-placeholder="Select state"
//   //                       data-select2-id="select2-data-4-680y"
//   //                       tabindex="-1"
//   //                       aria-hidden="true"
//   //                     >
//   //                       <option data-select2-id="select2-data-6-cshs"></option>
//   //                       <option value="AL">Alabama</option>
//   //                       <option value="AK">Alaska</option>
//   //                       <option value="AZ">Arizona</option>
//   //                       <option value="AR">Arkansas</option>
//   //                       <option value="CA">California</option>
//   //                       <option value="CO">Colorado</option>
//   //                       <option value="CT">Connecticut</option>
//   //                       <option value="DE">Delaware</option>
//   //                       <option value="FL">Florida</option>
//   //                       <option value="GA">Georgia</option>
//   //                       <option value="HI">Hawaii</option>
//   //                       <option value="ID">Idaho</option>
//   //                       <option value="IL">Illinois</option>
//   //                       <option value="IN">Indiana</option>
//   //                       <option value="IA">Iowa</option>
//   //                       <option value="KS">Kansas</option>
//   //                       <option value="KY">Kentucky</option>
//   //                       <option value="LA">Louisiana</option>
//   //                       <option value="ME">Maine</option>
//   //                       <option value="MD">Maryland</option>
//   //                       <option value="MA">Massachusetts</option>
//   //                       <option value="MI">Michigan</option>
//   //                       <option value="MN">Minnesota</option>
//   //                       <option value="MS">Mississippi</option>
//   //                       <option value="MO">Missouri</option>
//   //                       <option value="MT">Montana</option>
//   //                       <option value="NE">Nebraska</option>
//   //                       <option value="NV">Nevada</option>
//   //                       <option value="NH">New Hampshire</option>
//   //                       <option value="NJ">New Jersey</option>
//   //                       <option value="NM">New Mexico</option>
//   //                       <option value="NY">New York</option>
//   //                       <option value="NC">North Carolina</option>
//   //                       <option value="ND">North Dakota</option>
//   //                       <option value="OH">Ohio</option>
//   //                       <option value="OK">Oklahoma</option>
//   //                       <option value="OR">Oregon</option>
//   //                       <option value="PA">Pennsylvania</option>
//   //                       <option value="RI">Rhode Island</option>
//   //                       <option value="SC">South Carolina</option>
//   //                       <option value="SD">South Dakota</option>
//   //                       <option value="TN">Tennessee</option>
//   //                       <option value="TX">Texas</option>
//   //                       <option value="UT">Utah</option>
//   //                       <option value="VT">Vermont</option>
//   //                       <option value="VA">Virginia</option>
//   //                       <option value="WA">Washington</option>
//   //                       <option value="WV">West Virginia</option>
//   //                       <option value="WI">Wisconsin</option>
//   //                       <option value="WY">Wyoming</option>
//   //                     </select>
//   //                     <span
//   //                       className="select2 select2-container select2-container--bootstrap-5"
//   //                       dir="ltr"
//   //                       data-select2-id="select2-data-5-np4c"
//   //                       style={{ width: "391px" }}
//   //                     >
//   //                       <span className="selection">
//   //                         <span
//   //                           className="select2-selection select2-selection--single"
//   //                           role="combobox"
//   //                           aria-haspopup="true"
//   //                           aria-expanded="false"
//   //                           tabindex="0"
//   //                           aria-disabled="false"
//   //                           aria-labelledby="select2-2fn7-container"
//   //                           aria-controls="select2-2fn7-container"
//   //                         >
//   //                           <span
//   //                             className="select2-selection__rendered"
//   //                             id="select2-2fn7-container"
//   //                             role="textbox"
//   //                             aria-readonly="true"
//   //                             title="Select state"
//   //                           >
//   //                             <span className="select2-selection__placeholder">
//   //                               Select state
//   //                             </span>
//   //                           </span>
//   //                           <span
//   //                             className="select2-selection__arrow"
//   //                             role="presentation"
//   //                           >
//   //                             <b role="presentation"></b>
//   //                           </span>
//   //                         </span>
//   //                       </span>
//   //                       <span
//   //                         className="dropdown-wrapper"
//   //                         aria-hidden="true"
//   //                       ></span>
//   //                     </span>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //               <div className="row">
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">City</label>
//   //                     <input
//   //                       name="city"
//   //                       value={city}
//   //                       onChange={handleChange}
//   //                       className="select2 form-control select2-hidden-accessible"
//   //                       data-select2-placeholder="Select city"
//   //                       data-select2-id="select2-data-7-809c"
//   //                       tabindex="-1"
//   //                       aria-hidden="true"
//   //                       type="text"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //                 <div className="col-lg-6">
//   //                   <div className="mb-3">
//   //                     <label className="form-label">ZIP code</label>
//   //                     <input
//   //                       name="zipCode"
//   //                       value={zipCode}
//   //                       onChange={handleChange}
//   //                       type="number"
//   //                       className="form-control"
//   //                     />
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //         {/* <!-- Right side --> */}
//   //         <div className="card mb-4">
//   //           <div className="card-body">
//   //             <div className="card-body">
//   //               <h3 className="h6">Notes</h3>
//   //               <textarea className="form-control" rows="3"></textarea>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   // return (
//   //   <>
//   //     <h1>{"Create New Account"}</h1>
//   //     <section className="form-container">
//   //       <form onSubmit={handleSubmit}>
//   //         <h2>Account Information</h2>
//   //         <input
//   //           value={firstName}
//   //           onChange={(e) => setFirstName(e.target.value)}
//   //           placeholder="First Name"
//   //           className="input-field"
//   //         />
//   //         {errors.firstName && <p className="error-message">{errors.firstName}</p>}
//   //         <input
//   //           value={lastName}
//   //           onChange={(e) => setLastName(e.target.value)}
//   //           placeholder="Last Name"
//   //           className="input-field"
//   //         />
//   //         {errors.lastName && <p className="error-message">{errors.lastName}</p>}
//   //         <input
//   //           value={email}
//   //           onChange={(e) => setEmail(e.target.value)}
//   //           placeholder="Email"
//   //           className="input-field"
//   //         />
//   //         {errors.email && <p className="error-message">{errors.email}</p>}
//   //         <input
//   //           value={phoneNumber}
//   //           onChange={(e) => setPhoneNumber(e.target.value)}
//   //           placeholder="Phone Number"
//   //           className="input-field"
//   //         />
//   //         {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

//   //         <h2>Company Information</h2>
//   //         <input
//   //           value={companyName}
//   //           onChange={(e) => setCompanyName(e.target.value)}
//   //           placeholder="Company Name"
//   //           className="input-field"
//   //         />
//   //         {errors.companyName && <p className="error-message">{errors.companyName}</p>}
//   //         <select
//   //           className="form-select"
//   //           value={businessType}
//   //           // onChange={handleSelect}
//   //           name="business"
//   //         >
//   //           <option defaultValue>Open this select menu</option>
//   //           <option value="Construction">Construction</option>
//   //           <option value="Moving">Moving</option>
//   //           <option value="Delivery">Delivery</option>
//   //           <option value="Freight Hauling">Freight Hauling</option>
//   //           <option value="Landscaping">Landscaping</option>
//   //           <option value="Transport">Transport</option>
//   //         </select>
//   //         {errors.businessType && <p className="error-message">{errors.businessType}</p>}
//   //         <input
//   //           value={fleetSize}
//   //           onChange={(e) => setFleetSize(e.target.value)}
//   //           placeholder="Fleet Size"
//   //           className="input-field"
//   //         />
//   //         {errors.fleetSize && <p className="error-message">{errors.fleetSize}</p>}
//   //         <input
//   //           value={lookingFor}
//   //           onChange={(e) => setLookingFor(e.target.value)}
//   //           placeholder="Looking For"
//   //           className="input-field"
//   //         />
//   //         {errors.lookingFor && <p className="error-message">{errors.lookingFor}</p>}
//   //         <input
//   //           value={equipmentType}
//   //           onChange={(e) => setEquipmentType(e.target.value)}
//   //           placeholder="Equipment Type"
//   //           className="input-field"
//   //         />
//   //         {errors.equipmentType && <p className="error-message">{errors.equipmentType}</p>}

//   //         <h2>Location Information</h2>
//   //         <input
//   //           value={address}
//   //           onChange={(e) => setAddress(e.target.value)}
//   //           placeholder="Address"
//   //           className="input-field"
//   //         />
//   //         {errors.address && <p className="error-message">{errors.address}</p>}
//   //         <input
//   //           value={city}
//   //           onChange={(e) => setCity(e.target.value)}
//   //           placeholder="City"
//   //           className="input-field"
//   //         />
//   //         {errors.city && <p className="error-message">{errors.city}</p>}
//   //         <input
//   //           value={state}
//   //           onChange={(e) => setState(e.target.value)}
//   //           placeholder="State"
//   //           className="input-field"
//   //         />
//   //         {errors.state && <p className="error-message">{errors.state}</p>}
//   //         <input
//   //           value={zipCode}
//   //           onChange={(e) => setZipCode(e.target.value)}
//   //           placeholder="Zip Code"
//   //           className="input-field"
//   //         />
//   //         {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}

//   //         <div className="button-group">
//   //           <button type="submit" className="form-button">
//   //             Create new Account
//   //           </button>
//   //           <button type="button" onClick={() => navigate(-1)} className="form-button cancel-button">
//   //             Cancel
//   //           </button>
//   //         </div>
//   //       </form>
//   //     </section>
//   //   </>
//   // );
// }

export default CreateAccount;
