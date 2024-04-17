import { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [allInfo, setAllInfo] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/info/all");
        const departments = response.data.departments;

        setAllInfo(departments);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };

    fetchDepartments();
  }, [allInfo]);

  return (
    <div className="pt-32 bg-green-200 min-h-screen">
      <h1 className="text-center text-5xl font-bold mb-10">
        We offer the following services:
      </h1>
      <div className="px-4 ml-96 mr-96 pb-24 md:px-0">
        {allInfo.map((department) => (
          <div key={department.department_id} className="mb-10">
            <h3 className="text-4xl font-semibold mb-4">
              {department.department_name}
            </h3>
            {department.doctors.length > 0 ? (
              department.doctors.map((doctor) => (
                <div
                  key={doctor.doctor_id}
                  className="bg-white shadow rounded-lg p-6 mb-6"
                >
                  <p className="text-2xl font-semibold mb-4">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Hospital:</span>{" "}
                    {doctor.hospital.hospital_name}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Location:</span>{" "}
                    {doctor.hospital.hospital_location}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xl font-semibold">No doctors available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
