import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewAccount } from "../../store/accounts";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";

const CreateAccount = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addressInfo, setAddressInfo] = useState({
    companyName: "",
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
  const [errors, setErrors] = useState({})



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
    setErrors({});

    const newErrors = {};
    if (!addressInfo.companyName) newErrors.companyName = "Company name is required";
    if (!addressInfo.businessType) newErrors.businessType = "Vocation is required";
    if (!addressInfo.equipmentType) newErrors.equipmentType = "Equipment type is required";
    if (!addressInfo.fleetSize) newErrors.fleetSize = "Fleet size is required";
    if (!addressInfo.lookingFor) newErrors.lookingFor = "Looking-for is required";
    if (!addressInfo.email) newErrors.email = "Email is required";
    if (!addressInfo.phoneNumber) newErrors.phoneNumber = "Number is required";
    if (!addressInfo.address) newErrors.address = "address is required";
    if (!addressInfo.city) newErrors.city = "city is required";
    if (!addressInfo.state) newErrors.state = "state is required";
    if (!addressInfo.zipCode) newErrors.zipCode = "zipCode is required";


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const processedEquipmentType = addressInfo.equipmentType.toString();  // Ensure this is a string

    const payload = {
      ownerId: user.id,
      ...addressInfo,
      equipmentType: processedEquipmentType, 
    };

    let newAccount;
    try {
      newAccount = await dispatch(createNewAccount(payload));
      navigate(`/account/${newAccount.id}`);
    } catch (err) {
      if (err.response) {
        // If the error is an HTTP response
        const data = await err.response.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
        console.error(errors.data.errors)
      } else {
        setErrors(["An unexpected error occurred. Please try again."]);
        console.error(errors)
      }
    }
  };


  return (
    <>
      <Profile
        handleSubmit={handleSubmit}
        businessType={addressInfo.businessType}
        handleChange={handleChange}
        equipmentType={addressInfo.equipmentType}
        companyName={addressInfo.companyName}
        fleetSize={addressInfo.fleetSize}
        lookingFor={addressInfo.lookingFor}
        email={addressInfo.email}
        phoneNumber={addressInfo.phoneNumber}
        address={addressInfo.address}
        city={addressInfo.city}
        state={addressInfo.state}
        zipCode={addressInfo.zipCode}
        errors={errors}
      />
    </>
  );
};


export default CreateAccount;
