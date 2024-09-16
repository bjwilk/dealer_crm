import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateContact } from "../../store/accounts";
import { csrfFetch } from "../../store/csrf";

const UpdateContact = () => {
  const { id, contactId } = useParams();
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

  const fetchAccounts = async () => {
    try {
      const response = await csrfFetch(`/api/accounts/company/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setContactInfo(data);
      const contact = data.contacts.find((contact) => contact.id === parseInt(contactId));
      if (contact) {
        setContactInfo(contact);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user, id, contactId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!contactInfo.name) newErrors.name = "Name is required";
    if (!contactInfo.phone) newErrors.phone = "Phone is required";
    if (!contactInfo.email) newErrors.email = "Email is required";
    if (!contactInfo.position) newErrors.position = "Position is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      accountId: parseInt(id),
      ...contactInfo,
    };

    let updatedContact;
    try {
       updatedContact = await dispatch(fetchUpdateContact(contactId, payload));
      navigate(`/account/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Update Contact</h1>
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

export default UpdateContact;
