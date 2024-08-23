import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile, fetchUpdateAccount } from "../../store/accounts";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../Profile/Profile";

const UpdateAccount = () => {
  const { id } = useParams();
  const acctId = parseInt(id);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addressInfo, setAddressInfo] = useState({
    companyName: "",
    businessType: "",
    equipmentType: [],
    fleetSize: 1,
    lookingFor: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: 0,
  });

  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (user) {
      dispatch(fetchAccountProfile(acctId))
        .then((response) => {
          if (response) {
            setAddressInfo(response);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch account profile:", error);
        });
    }
  }, [dispatch, acctId, user]);

  const handleChange = (e) => {
    console.log(addressInfo, e.target.name);
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
      case "equipmentType": {
        const { value, checked } = e.target;

        setAddressInfo((prev) => {
          // Ensure equipmentType is an array
          const currentEquipmentType = Array.isArray(prev.equipmentType)
            ? prev.equipmentType
            : [];

          if (checked) {
            // Add the value to the array if it's not already present
            return {
              ...prev,
              equipmentType: currentEquipmentType.includes(value)
                ? currentEquipmentType // No change if value is already present
                : [...currentEquipmentType, value], // Add value if not present
            };
          } else {
            // Remove the value from the array if it's present
            return {
              ...prev,
              equipmentType: currentEquipmentType.filter(
                (item) => item !== value
              ),
            };
          }
        });
        break;
      }
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

    let newAccount;
    try {
      const newAccount = await dispatch(fetchUpdateAccount(payload));
      navigate(`/account/${acctId}`);
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

  return (
    <>
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

export default UpdateAccount;
