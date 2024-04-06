import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "./OAuth";

const PatientForm = () => {
  const [patientDetails, setPatientDetails] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    address: "",
    phone_number: "",
    type: "P",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setPatientDetails({
      ...patientDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addPatient = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/auth/sign-up/patient", patientDetails)
      .then((response) => {
        console.log(response.data);
        setPatientDetails({});
        formRef.current.reset();
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          ref={formRef}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5"
          onSubmit={addPatient}
        >
          <OAuth />
          <div className="mb-4 flex space-x-1">
            <div className="w-1/2 pr-2">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                First Name:
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                name="first_name"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Last Name:
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                name="last_name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Phone Number:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone_number"
              pattern="[0-9]{10}"
              maxLength="10"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <span className="block mb-2 text-sm font-bold text-gray-700">
              Gender:
            </span>
            <div className="flex space-x-3">
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio mr-2"
                  name="gender"
                  value="M"
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio mr-2"
                  name="gender"
                  value="F"
                  onChange={handleChange}
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio mr-2"
                  name="gender"
                  value="O"
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Date of Birth:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="date"
              name="date_of_birth"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Address:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="address"
              onChange={handleChange}
            ></input>
          </div>
          <div className="mb-6 mt-8 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 disabled:bg-green-400 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
          <div className="text-center">
            <p style={{ color: "red" }}>{error && "Error adding patient"}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
