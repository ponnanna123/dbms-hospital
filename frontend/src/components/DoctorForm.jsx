import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "./OAuth";

const DoctorForm = ({ selectedOption }) => {
  const [doctorDetails, setDoctorDetails] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    department_id: "",
    hospital_id: "",
    type: "D",
  });

  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/info/departments");
        setDepartments(response.data.departments);
      } catch (error) {
        console.log("Failed to fetch departments", error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await axios.get("/api/info/hospitals");
        setHospitals(response.data.hospitals);
      } catch (error) {
        console.log("Failed to fetch hospitals", error);
      }
    };

    fetchDepartments();
    fetchHospitals();
  }, []);

  const formRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDoctorDetails({
      ...doctorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    axios
      .post("/api/auth/sign-up/doctor", doctorDetails)
      .then((response) => {
        console.log(response.data);
        setDoctorDetails({});
        formRef.current.reset();
        setLoading(false);
        setError(null);
        navigate("/sign-in");
      })
      .catch((err) => {
        setError(err.message);
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
                required
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
                required
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
              required
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
              required
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
              required
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
                  required
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
              Hospital:
            </label>
            <select
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="hospital_id"
              onChange={handleChange}
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.hospital_id} value={hospital.hospital_id}>
                  {hospital.hospital_name}, {hospital.hospital_location}
                </option>
              ))}
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
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option
                  key={department.department_id}
                  value={department.department_id}
                >
                  {department.department_name}
                </option>
              ))}
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
