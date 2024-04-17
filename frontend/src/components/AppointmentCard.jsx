import React from "react";

const AppointmentCard = ({ appointment }) => {
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
              Dr. {appointment.first_name} {appointment.last_name}
            </h2>
            <p className="text-gray-600">
              <span className="font-bold">Status:</span> {appointment.status}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Date:</span> {date}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Time:</span> {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
