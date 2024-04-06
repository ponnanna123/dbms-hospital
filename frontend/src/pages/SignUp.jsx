import { useState } from "react";
import PatientForm from "../components/PatientForm";
import DoctorForm from "../components/DoctorForm";

const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState("patient");

  const handleSliderChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 pt-16">
      <div className="w-full max-w-sm mb-1 transform -translate-x-5">
        <h2 className="mt-10 -mb-11 text-2xl text-center text-green-800">
          Select type of account to create:
        </h2>
        <div className="relative rounded-full overflow-hidden bg-white border border-green-700 mt-16">
          <button
            onClick={() => handleSliderChange("patient")}
            className={`${
              selectedOption === "patient"
                ? "bg-green-500 text-white"
                : "text-green-500"
            } w-1/2 py-2 text-lg font-bold outline-none focus:outline-none transition duration-300 ease-in-out`}
          >
            Patient
          </button>
          <button
            onClick={() => handleSliderChange("doctor")}
            className={`${
              selectedOption === "doctor"
                ? "bg-green-500 text-white"
                : "text-green-500"
            } w-1/2 py-2 text-lg font-bold outline-none focus:outline-none transition duration-300 ease-in-out`}
          >
            Doctor
          </button>
          <span
            className={`absolute top-0 left-0 h-full bg-green-500 transition duration-300 ease-in-out -z-10 ${
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
