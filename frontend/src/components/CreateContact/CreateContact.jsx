import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateContact } from "../../store/accounts";

const CreateContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    position: ""
  });
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

    const payload = {
      ...contactInfo,
      userId: user.id, // Assuming you need to link the contact with the user
      accountId: acctId,
    };

    try {
      await dispatch(fetchCreateContact(acctId, payload));
      navigate(`/account/${acctId}`);
    } catch (err) {
      console.error(err);
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
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={contactInfo.position}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={contactInfo.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contactInfo.email}
            onChange={handleChange}
          />

          <button className="create-button" type="submit">
            Create Contact
          </button>
        </form>
      </header>
    </div>
  );
};

export default CreateContact;
