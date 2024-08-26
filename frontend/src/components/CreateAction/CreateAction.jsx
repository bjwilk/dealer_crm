import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateAction } from "../../store/accounts";

const CreateAction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [contactInfo, setContactInfo] = useState({
    report: "",
    details: "",
    reminder: "",
  });
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
      accountId: acctId,
    };
    console.log("Reminder:", contactInfo.reminder)


    try {
      await dispatch(fetchCreateAction(acctId, payload));
      navigate(`/account/${acctId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Action</h1>
        <form className="company" onSubmit={handleSubmit}>
          <input
            type="text"
            name="report"
            placeholder="Title"
            value={contactInfo.report}
            onChange={handleChange}
          />
          <input
            type="text"
            name="details"
            placeholder="Details"
            value={contactInfo.details}
            onChange={handleChange}
          />
          <input
            type="date"
            name="reminder"
            placeholder="Date Due"
            value={contactInfo.reminder}
            onChange={handleChange}
          />

          <button className="create-button" type="submit">
            Create Action
          </button>
        </form>
      </header>
    </div>
  );
};

export default CreateAction;
