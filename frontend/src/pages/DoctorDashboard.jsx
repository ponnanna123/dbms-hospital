import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoctorAppointmentCard from "../components/DoctorAppointmentCard";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/api/appointments/doctor/${currentUser.data.account_id}`
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.log("Failed to fetch appointments", error);
      }
    };

    fetchAppointments();
  }, [appointments]);

  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "Scheduled"
  );
  const completedAppointments = appointments.filter(
    (appt) => appt.status === "Completed"
  );

  return (
    <div className="flex flex-col items-center bg-green-200 pt-36 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24 pl-12 pr-12">
      <div className="flex justify-between w-full px-4 mb-20 mt-4 transform -translate-y-10">
        <h3 className="text-4xl font-bold">List of appointments:</h3>
      </div>
      <h3 className="text-4xl font-semibold mb-10">Pending</h3>
      {pendingAppointments.length > 0 ? (
        <div className="flex flex-wrap justify-start w-full px-4 mb-40">
          {pendingAppointments.map((appt) => (
            <div
              key={appt.appointment_id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <DoctorAppointmentCard appointment={appt} />
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-5xl font-bold text-center mt-80 mb-80">
          No pending appointments
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
              <DoctorAppointmentCard appointment={appt} />
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-5xl font-bold text-center mt-80 mb-80">
          No completed appointments
        </h3>
      )}
    </div>
  );
};

export default DoctorDashboard;
