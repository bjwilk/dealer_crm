import { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateContact } from "../../store/accounts";

const CreateContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const acctId = parseInt(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!contactInfo.name) newErrors.name = "Name title name is required";
    if (!contactInfo.position)
      newErrors.position = "Position report is required";
    if (!contactInfo.phone) newErrors.phone = "Phone number is required";
    if (!contactInfo.email) newErrors.email = "Email is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...contactInfo,
      userId: user.id, // Assuming you need to link the contact with the user
      accountId: acctId,
    };

    try {
      await dispatch(fetchCreateContact(acctId, payload));
      navigate(`/account/${acctId}`);
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
        <h1>Create Contact</h1>
        <form className="company" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contactInfo.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={contactInfo.position}
            onChange={handleChange}
          />
          {errors.position && (
            <p className="error-message">{errors.position}</p>
          )}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={contactInfo.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contactInfo.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <button className="create-button" type="submit">
            Create Contact
          </button>
          <NavLink to={`/account/${id}`}>
            <button className="btn btn-primary btn-sm btn-icon-text">Cancel</button>
          </NavLink>

        </form>
      </header>
    </div>
  );
};

export default CreateContact;
