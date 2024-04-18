import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PatientAppointmentCard from "../components/PatientAppointmentCard";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/api/appointments/patient/${currentUser.data.account_id}`
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.log("Failed to fetch appointments", error);
      }
    };

    fetchAppointments();
  }, [appointments]);

  const completedAppointments = appointments.filter(
    (appt) => appt.status === "Completed"
  );
  const canceledAppointments = appointments.filter(
    (appt) => appt.status === "Canceled"
  );
  const scheduledAppointments = appointments.filter(
    (appt) => appt.status === "Scheduled"
  );

  return (
    <div className="flex flex-col items-center bg-green-200 pt-36 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24 pl-12 pr-12">
      <div className="flex justify-between w-full px-4 mb-8 mt-4 transform -translate-y-10">
        <h2 className="text-4xl font-bold">List of appointments:</h2>
        <button
          onClick={() => navigate("/new-appointment")}
          className="px-4 py-2 text-lg bg-green-700 border-green-700 border-2 text-white rounded hover:text-green-700 hover:bg-green-200"
        >
          Book a new appointment
        </button>
      </div>
      <h3 className="text-4xl font-semibold mb-10">Upcoming</h3>
      {scheduledAppointments.length > 0 ? (
        <div className="flex flex-wrap justify-start w-full px-4 mb-40">
          {scheduledAppointments.map((appt) => (
            <div
              key={appt.appointment_id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <PatientAppointmentCard appointment={appt} />
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-5xl font-bold text-center mt-80 mb-80">
          You have no scheduled appointments.
        </h3>
      )}
      <h3 className="text-4xl font-semibold mb-10">Completed</h3>
      {completedAppointments.length > 0 ? (
        <div className="flex flex-wrap justify-start w-full px-4 mb-40">
          {completedAppointments.map((appt) => (
            <div
              key={appt.appointment_id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <PatientAppointmentCard appointment={appt} />
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-5xl font-bold text-center mt-80 mb-80">
          You have no completed appointments.
        </h3>
      )}
      <h3 className="text-4xl font-semibold mb-10">Canceled</h3>
      {canceledAppointments.length > 0 ? (
        <div className="flex flex-wrap justify-start w-full px-4 mb-40">
          {canceledAppointments.map((appt) => (
            <div
              key={appt.appointment_id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <PatientAppointmentCard appointment={appt} />
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-5xl font-bold text-center mt-80 mb-80">
          You have no canceled appointments.
        </h3>
      )}
    </div>
  );
};

export default PatientDashboard;
