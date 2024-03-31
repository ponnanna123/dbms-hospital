import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorForm = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    specialization: "",
    type: "D",
  });

  const formRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setDoctorDetails({
      ...doctorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = () => {
    axios
      .post("/api/auth/sign-up/doctor", doctorDetails)
      .then((response) => {
        console.log(response.data);
        setDoctorDetails({});
        formRef.current.reset();
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-center">
        <form
          ref={formRef}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5"
        >
          <div className="mb-4 flex space-x-5">
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
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              maxLength="12"
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
          <div className="mb-6 mt-8 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={addDoctor}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
