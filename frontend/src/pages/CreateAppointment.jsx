import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateAppointment = () => {
  const [appointmentDetails, setAppointmentetails] = useState({
    doctor_id: "",
    department_id: "",
    hospital_id: "",
    appointment_datetime: "",
    status: "",
    duration: "",
    description: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
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
    setError(null);

    axios
      .post(
        `/api/appointments/create/${currentUser.data.account_id}`,
        appointmentDetails
      )
      .then((response) => {
        console.log(response.data);
        setAppointmentDetails({});
        formRef.current.reset();
        setLoading(false);
        setError(null);
        // navigate to a different page if needed
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setAppointmentetails({
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
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
