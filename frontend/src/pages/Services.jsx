import { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/info/departments");
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="pt-32 bg-green-200">
      <h1 className="text-center text-5xl font-bold mb-10">
        We offer the following services:
      </h1>
      <h2 className="text-center text-2xl font-semibold">
        (Note: these services are available at all the hospitals)
      </h2>
      <main
        className="min-h-screen pt-24 pl-24 pr-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start justify-center bg-cover bg-center"
        // style={{ backgroundImage: "url('../../images/homepage.png')" }}
      >
        {departments.map((department) => (
          <div
            key={department.department_id}
            className="text-center p-10 bg-green-100 text-green-700 backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-lg shadow-lg"
          >
            <h2 className="text-4xl font-bold mb-4">
              {department.department_name}
            </h2>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Services;
