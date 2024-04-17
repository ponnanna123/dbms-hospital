import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

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

  const handleUpdate = async (appt_id, status) => {
    try {
      const response = await axios.put(
        `/api/appointments/update/status/${appt_id}`,
        { status }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Failed to delete appointment", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-green-200 pt-36 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24 pl-12 pr-12">
      <div className="flex justify-between w-full px-4 mb-20 mt-4 transform -translate-y-10">
        <h3 className="text-4xl font-bold">List of appointments:</h3>
      </div>
      {appointments.length > 0 ? (
        <div className="flex flex-wrap justify-start w-full px-4 mb-40">
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
                    src="../../images/blood-drop.png"
                    alt="logo"
                  />
                  <div className="flex justify-between bg-white shadow-lg rounded-lg p-6 mb-6">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {appointment.first_name} {appointment.last_name}
                      </div>
                      <p className="text-gray-600">
                        <span className="font-bold">Status:</span>
                        <br />
                        {appointment.status}
                      </p>
                      <p className="text-gray-600 text-base">Date: {date}</p>
                      <p className="text-gray-600 text-base">Time: {time}</p>
                    </div>
                    <div className="px-6 py-4 flex flex-col gap-y-6">
                      <button
                        onClick={() =>
                          handleUpdate(appointment.appointment_id, "Completed")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-700"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() =>
                          handleUpdate(appointment.appointment_id, "Canceled")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 className="text-2xl font-bold">No appointments scheduled</h3>
      )}
    </div>
  );
};

export default DoctorDashboard;
