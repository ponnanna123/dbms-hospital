import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/api/appointments/list/${currentUser.data.account_id}`
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.log("Failed to fetch appointments", error);
      }
    };

    fetchAppointments();
  }, [appointments]);

  const handleDelete = async (appt_id) => {
    try {
      const response = await axios.get(`/api/appointments/delete/${appt_id}`);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to delete appointment", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-green-200 pt-36 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24 pl-12 pr-12">
      <div className="flex justify-between w-full px-4 mb-8">
        <h3 className="text-4xl font-bold">List of appointments:</h3>
        <button
          onClick={() => navigate("/new-appointment")}
          className="px-4 py-2 text-lg bg-green-700 border-green-700 border-2 text-white rounded hover:text-green-700 hover:bg-green-200"
        >
          Book a new appointment
        </button>
      </div>
      <div className="flex flex-wrap justify-start w-full px-4">
        {appointments.map((appointment) => {
          const dateTime = new Date(appointment.appointment_datetime);
          const date = dateTime.toLocaleDateString();
          const time = dateTime.toLocaleTimeString();
          return (
            <div
              key={appointment.appointment_id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <div className="rounded overflow-hidden shadow-lg">
                <img
                  className="w-full h-64 object-cover"
                  src={appointment.image}
                  alt="Background"
                />
                <div className="flex justify-between bg-white shadow-lg rounded-lg p-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {appointment.first_name} {appointment.last_name}
                    </h2>
                    <p className="text-gray-600">
                      <span className="font-bold">Status:</span>{" "}
                      {appointment.status}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Hospital:</span>{" "}
                      {appointment.hospital_name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Date:</span> {date}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Time:</span> {time}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(appointment.appointment_id)}
                    className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-700 transition-colors duration-200 rounded-full"
                  >
                    <i className="fas fa-trash text-white"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientDashboard;
