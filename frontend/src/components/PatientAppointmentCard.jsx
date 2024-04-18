import axios from "axios";

const PatientAppointmentCard = ({ appointment }) => {
  const dateTime = new Date(appointment.appointment_datetime);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();

  const handleDelete = async (appt_id) => {
    try {
      const response = await axios.get(`/api/appointments/delete/${appt_id}`);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to delete appointment", error);
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-64 object-cover"
        src={appointment.image}
        alt="Background"
      />
      <div className="flex justify-between bg-white shadow-lg rounded-lg p-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Dr. {appointment.first_name} {appointment.last_name}
          </h2>
          <p className="text-gray-600">
            <span className="font-bold">Hospital:</span>{" "}
            {appointment.hospital_name}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Location:</span>{" "}
            {appointment.hospital_location}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Date:</span> {date}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Time:</span> {time}
          </p>
        </div>
        <div className="text-gray-600">
          <button
            onClick={() => handleDelete(appointment.appointment_id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentCard;
