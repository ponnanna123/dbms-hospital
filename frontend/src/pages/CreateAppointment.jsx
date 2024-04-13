import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateAppointment = () => {
  const [appointmentDetails, setAppointmentetails] = useState({
    doctor_id: "",
    hospital_id: "",
    appointment_datetime: "",
    status: "",
    duration: "",
    description: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("/api/info/hospitals");
        setHospitals(response.data.hospitals);
      } catch (error) {
        console.log("Failed to fetch hospitals", error);
      }
    };

    fetchHospitals();
  }, []);

  const fetchDoctors = async (hospital_id) => {
    try {
      const response = await axios.get(`/api/info/doctors/${hospital_id}`);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.log("Failed to fetch doctors", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `/api/appointments/create/${currentUser.data.account_id}`,
      appointmentDetails
    );
  };

  const handleChange = (e) => {
    setHospitalId(e.target.value);
    fetchDoctors(e.target.value);
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Choose Hospital
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
              Choose Doctor
            </label>
            <select
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="doctor_id"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                  Dr. {doctor.first_name} {doctor.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Appointment Date and Time:
            </label>
            <input
              name="appointment_datetime"
              type="datetime-local"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Status:
            </label>
            <input name="status" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Duration:
            </label>
            <input name="duration" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Description:
            </label>
            <textarea name="description" onChange={handleChange} required />
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
              {loading ? "Loading..." : "Book Appointment"}
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
