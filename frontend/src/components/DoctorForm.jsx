import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "./OAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const DoctorForm = ({ selectedOption }) => {
  const [doctorDetails, setDoctorDetails] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    specialization_id: "",
    department_id: "",
    type: "D",
  });
  const { loading, error } = useSelector((state) => state.user);

  const formRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDoctorDetails({
      ...doctorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = (e) => {
    dispatch(signInStart());
    e.preventDefault();
    axios
      .post("/api/auth/sign-up/doctor", doctorDetails)
      .then((response) => {
        console.log(response.data);
        setDoctorDetails({});
        formRef.current.reset();
        dispatch(signInSuccess(response));
        navigate("/sign-in");
      })
      .catch((err) => {
        dispatch(signInFailure(err));
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          ref={formRef}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5"
          onSubmit={addDoctor}
        >
          <OAuth selectedOption={selectedOption} />
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
          <div className="mb-4">
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
              Specialization:
            </label>
            <select
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="specialization_id"
              onChange={handleChange}
            >
              <option value="">Select Specialization</option>
              <option value="1">General Physician</option>
              <option value="2">Cardiologist</option>
              <option value="3">Dermatologist</option>
              <option value="4">Orthopedic Surgeon</option>
              <option value="5">Pediatrician</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Department:
            </label>
            <select
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="department_id"
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="1">Emergency</option>
              <option value="2">Pediatrics</option>
              <option value="3">Radiology</option>
              <option value="4">Cardiology</option>
              <option value="5">Neurology</option>
              <option value="6">Oncology</option>
              <option value="7">Ophthalmology</option>
              <option value="8">Orthopaedics</option>
              <option value="9">Gynecology</option>
              <option value="10">Pharmacy</option>
            </select>
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
            <p style={{ color: "red" }}>{error && "Error adding doctor"}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
