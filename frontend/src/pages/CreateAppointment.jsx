import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAppointment = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctor_id: "",
    department_id: "",
    hospital_id: "",
    appointment_datetime: "",
    duration: "",
    description: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/info/departments");
        setDepartments(response.data.departments);
      } catch (error) {
        console.log("Failed to fetch departments", error);
      }
    };

    fetchHospitals();
    fetchDepartments();
  }, []);

  const formRef = useRef();
  const navigate = useNavigate();

  const fetchDoctors = async (hospitalId, departmentId) => {
    if (hospitalId || departmentId) {
      try {
        const response = await axios.get(
          `/api/info/doctors/${hospitalId}/${departmentId}`
        );
        setDoctors(response.data.doctors);
      } catch (error) {
        console.log("Failed to fetch doctors", error);
      }
    } else {
      console.log("hospitalId or departmentId is not set");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const appointmentData = {
      ...appointmentDetails,
      hospital_id: hospitalId,
      department_id: departmentId,
      doctor_id: doctorId,
    };

    const response = axios.post(
      `/api/appointments/create/${currentUser.data.account_id}`,
      appointmentData
    );

    try {
      setAppointmentDetails({});
      formRef.current.reset();
      setLoading(false);
      setError(false);
      navigate("/dashboard/patient");
    } catch (error) {
      console.log(error.message);
      setError(true);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAppointmentDetails({
      ...appointmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeHospital = (e) => {
    const newHospitalId = e.target.value;
    setHospitalId(newHospitalId);
    fetchDoctors(newHospitalId, departmentId);
  };

  const handleChangeDepartment = (e) => {
    const newDepartmentId = e.target.value;
    setDepartmentId(newDepartmentId);
    fetchDoctors(hospitalId, newDepartmentId);
  };

  const handleChangeDoctor = (e) => {
    const newDoctorId = e.target.value;
    setDoctorId(newDoctorId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-16"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-14">
            New Appointment
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Sort By Hospital
            </label>
            <select
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="hospital_id"
              onChange={handleChangeHospital}
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
              Sort By Department
            </label>
            <select
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="department_id"
              onChange={handleChangeDepartment}
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Choose Doctor
            </label>
            <select
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="doctor_id"
              required
              onChange={handleChangeDoctor}
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
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="appointment_datetime"
              type="datetime-local"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Duration:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="duration"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Description:
            </label>
            <textarea
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="description"
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
              {loading ? "Loading..." : "Book Appointment"}
            </button>
          </div>
          {/* <div className="text-center">
            <p style={{ color: "red" }}>
              {error && "An error occurred while creating the appointment"}
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
