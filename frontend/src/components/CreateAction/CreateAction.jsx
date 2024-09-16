import { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCreateAction } from "../../store/accounts";
import "./CreateAction.scss";

const CreateAction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [contactInfo, setContactInfo] = useState({
    report: "",
    details: "",
    reminder: "",
  });
  const [errors, setErrors] = useState({});
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
    if (!contactInfo.details)
      newErrors.details = "Action title name is required";
    if (!contactInfo.report) newErrors.report = "Action report is required";
    if (!contactInfo.reminder)
      newErrors.reminder = "Complete by date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...contactInfo,
      accountId: acctId,
    };

    try {
      await dispatch(fetchCreateAction(acctId, payload));
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
        <h1>Create Action</h1>
        <form className="company" onSubmit={handleSubmit}>
          <input
            type="text"
            name="report"
            placeholder="Title"
            value={contactInfo.report}
            onChange={handleChange}
          />
          {errors.details && <p className="error-message">{errors.details}</p>}

          <input
            type="text"
            name="details"
            placeholder="Report"
            value={contactInfo.details}
            onChange={handleChange}
          />
          {errors.report && <p className="error-message">{errors.report}</p>}
          <label>Complete by</label>
          {errors.reminder && (
            <p className="error-message">{errors.reminder}</p>
          )}
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
          <NavLink to={`/account/${acctId}`}>
            <button className="btn btn-primary btn-sm btn-icon-text">Cancel</button>
          </NavLink>


        </form>
      </header>
    </div>
  );
};

export default CreateAction;
