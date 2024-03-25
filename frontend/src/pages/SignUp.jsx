import { useState } from "react";
import "../App.css";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const addPatient = () => {
    const patientDetails = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob,
      gender: gender,
      address: address,
      phone_number: phoneNumber,
    };

    axios
      .post("http://localhost:5000/add-patient", patientDetails)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="p-10 bg-white rounded shadow-md w-96">
        <h2 className="mb-5 text-3xl font-semibold text-center text-gray-700">
          Add Patient
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            First Name:
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="first_name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Last Name:
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="last_name"
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setDob(e.target.value)}
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
                onChange={(e) => setGender(e.target.value)}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="gender"
                value="F"
                onChange={(e) => setGender(e.target.value)}
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="gender"
                value="O"
                onChange={(e) => setGender(e.target.value)}
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
            onChange={(e) => setAddress(e.target.value)}
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
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addPatient}
          >
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
