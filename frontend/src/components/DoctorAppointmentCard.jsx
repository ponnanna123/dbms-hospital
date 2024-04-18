import axios from "axios";

const DoctorAppointmentCard = ({ appointment }) => {
  const dateTime = new Date(appointment.appointment_datetime);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();

  const handleUpdateStatus = async (appt_id, status) => {
    try {
      const response = await axios.put(
        `/api/appointments/update/status/${appt_id}`,
        { status }
      );
      appointment = response.data;
      console.log(response.data);
    } catch (error) {
      console.log("Failed to delete appointment", error);
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-64 object-cover"
        src="../../images/blood-drop.svg"
        alt="Background"
      />
      <div className="flex justify-between bg-white shadow-lg rounded-lg p-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {appointment.gender === "M" ? "Mr" : "Mrs"}.{" "}
            {appointment.first_name} {appointment.last_name}
          </h2>
          <p className="text-gray-600">
            <span className="font-bold">Date:</span> {date}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Time:</span> {time}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Description:</span>{" "}
            {appointment.description}
          </p>
        </div>
        <div className="text-gray-600">
          <button
            hidden={
              appointment.status === "Canceled" ||
              appointment.status === "Completed"
            }
            onClick={() =>
              handleUpdateStatus(appointment.appointment_id, "Canceled")
            }
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          >
            Cancel
          </button>
          <button
            hidden={
              appointment.status === "Canceled" ||
              appointment.status === "Completed"
            }
            onClick={() =>
              handleUpdateStatus(appointment.appointment_id, "Completed")
            }
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;
