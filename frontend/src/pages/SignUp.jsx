import React, { useState } from "react";
import PatientForm from "../components/PatientForm";
import DoctorForm from "../components/DoctorForm";

const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState("patient");

  const handleSliderChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
      <div className="w-full max-w-sm mb-8">
        <div className="relative rounded-full overflow-hidden bg-red-400 border border-red-500 mt-16">
          <button
            onClick={() => handleSliderChange("patient")}
            className={`${
              selectedOption === "patient"
                ? "bg-red-500 text-white"
                : "text-red-500"
            } w-1/2 py-2 text-sm font-medium outline-none focus:outline-none transition duration-300 ease-in-out`}
          >
            Patient
          </button>
          <button
            onClick={() => handleSliderChange("doctor")}
            className={`${
              selectedOption === "doctor"
                ? "bg-red-500 text-white"
                : "text-red-500"
            } w-1/2 py-2 text-sm font-medium outline-none focus:outline-none transition duration-300 ease-in-out`}
          >
            Doctor
          </button>
          <span
            className={`absolute top-0 left-0 h-full bg-red-500 transition duration-300 ease-in-out ${
              selectedOption === "doctor" ? "transform translate-x-full" : ""
            }`}
            style={{ width: "50%" }}
          ></span>
        </div>
      </div>
      <div className="w-full max-w-md">
        {selectedOption === "patient" && <PatientForm />}
        {selectedOption === "doctor" && <DoctorForm />}
      </div>
    </div>
  );
};

export default SignUp;
