import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateAppointment = () => {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({
    doctor_id: "",
    hospital_id: "",
    appointment_datetime: "",
    status: "",
    duration: "",
    description: "",
  });
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `/api/appointments/create/${currentUser.data.account_id}`,
      formData
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-14">
            New Appointment
          </h2>
          {/* Add your form fields here */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Doctor ID:
            </label>
            <input
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Hospital ID:
            </label>
            <input
              name="hospital_id"
              value={formData.hospital_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Appointment Date and Time:
            </label>
            <input
              name="appointment_datetime"
              type="datetime-local"
              value={formData.appointment_datetime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Status:
            </label>
            <input
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Duration:
            </label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 mt-8 text-center">
            <button
              className={`w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline 
                  ${
                    loading
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create Appointment"}
            </button>
          </div>
          <div className="text-center">
            <p style={{ color: "red" }}>
              {error && "An error occurred while creating the appointment"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
