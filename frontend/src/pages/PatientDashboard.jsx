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
  }, []);

  return (
    <div className="flex flex-col items-center bg-green-200 pt-36">
      <div className="flex justify-between w-full px-4 mb-8">
        <h3 className="text-2xl font-bold">List of appointments:</h3>
        <button
          onClick={() => navigate("/new-appointment")}
          className="px-4 py-2 text-lg bg-green-700 border-green-700 border-2 text-white rounded hover:text-green-700 hover:bg-green-200"
        >
          Book a new appointment
        </button>
      </div>
      <div className="flex flex-wrap justify-between w-full px-4">
        {appointments.map((appointment) => {
          const dateTime = new Date(appointment.appointment_datetime);
          const date = dateTime.toLocaleDateString();
          const time = dateTime.toLocaleTimeString();
          return (
            <div key={appointment.appointment_id} className="w-1/3 p-4">
              <div className="rounded overflow-hidden shadow-lg">
                <img
                  className="w-full h-64 object-cover"
                  src={appointment.image}
                  alt="Background"
                />
                <div className="px-6 py-4 bg-green-800 text-gray-200">
                  <p className="font-bold text-xl mb-2">
                    Status: {appointment.status}
                  </p>
                  <p className="text-base">
                    Doctor: {appointment.first_name} {appointment.last_name}
                  </p>
                  <p className="text-base">Hospital: {appointment.hospital}</p>
                  <p className="text-base">Date: {date}</p>
                  <p className="text-base">Time: {time}</p>
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
