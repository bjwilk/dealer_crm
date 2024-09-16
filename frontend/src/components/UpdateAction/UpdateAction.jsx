import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateAction } from "../../store/accounts";
import { csrfFetch } from "../../store/csrf";

const UpdateAction  = () => {
  const { id, actionId } = useParams();
  const dispatch = useDispatch();
  const [contactInfo, setContactInfo] = useState({
    report: "",
    details: "",
    reminder: "",
  });
  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const acctId = parseInt(id);


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
      const action = data.actions.find((action) => action.id === parseInt(actionId));
      if (action) {
        setContactInfo(action);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user, id, actionId]);

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
      accountId: parseInt(id),
      ...contactInfo,
    };


      try {
        await dispatch(fetchUpdateAction(acctId, payload));
        navigate(`/account/${acctId}`);
      } catch (err) {
        const data = await err.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
        console.error(errors.data.errors);
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
        <h1>Update Action</h1>
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
        </form>
      </header>
    </div>
  );};

export default UpdateAction;
