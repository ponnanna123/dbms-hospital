import { useRef, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [patientDetails, setPatientDetails] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    address: "",
    phone_number: "",
    type: "",
  });

  const formRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setPatientDetails({
      ...patientDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addPatient = () => {
    axios
      .post("http://localhost:5000/api/auth/sign-up", patientDetails)
      .then((response) => {
        console.log(response.data);
        setPatientDetails({});
        formRef.current.reset();
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-center">
        <div className="mb-4">
          <span className="block mb-2 text-sm font-bold text-gray-700">
            Select Option:
          </span>
          <div className="flex items-center space-x-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="type"
                value="P"
                checked
                onChange={handleChange}
              />
              <span className="ml-2">Patient</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="type"
                value="D"
                onChange={handleChange}
              />
              <span className="ml-2">Doctor</span>
            </label>
          </div>
        </div>
        <form
          ref={formRef}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5 "
        >
          <h2 className="mb-5 text-3xl font-semibold text-center text-gray-700">
            Add Patient
          </h2>
          <div className="mb-4">
            <div className="mb-4 flex">
              <div className="flex-1 mr-2">
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
              <div className="flex-1 ml-2">
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
                type="number"
                name="phone_number"
                onChange={handleChange}
              />
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
              <span className="block mb-2 text-sm font-bold text-gray-700">
                Gender:
              </span>
              <div className="flex items-center space-x-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="gender"
                    value="M"
                    onChange={handleChange}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="gender"
                    value="F"
                    onChange={handleChange}
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="gender"
                    value="O"
                    onChange={handleChange}
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Address:
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                name="address"
                onChange={handleChange}
              />
            </div>

            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={addPatient}
              >
                Add Patient
              </button>
            </div>
          </div>
        </form>
        <form
          ref={formRef}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5 "
        >
          <h2 className="mb-5 text-3xl font-semibold text-center text-gray-700">
            Add Doctor
          </h2>
          <div className="mb-4">
            <div className="mb-4 flex">
              <div className="flex-1 mr-2">
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
              <div className="flex-1 ml-2">
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
                type="number"
                name="phone_number"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Specialization:
              </label>
              <select
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                name="specialization"
                onChange={handleChange}
              >
                <option value="">Select Specialization</option>
                <option value="General Physician">General Physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="Pediatrician">Pediatrician</option>
              </select>
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={addPatient}
              >
                Add Doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
