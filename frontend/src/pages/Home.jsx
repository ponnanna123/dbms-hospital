import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await axios.get("http://localhost:5000/patients");
      setPatients(data);
    };
    fetchPatients();
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <h1 className="text-center font-bold text-4xl">List of Patients:</h1>
      {patients.map((patient) => (
        <div key={patient.patient_id} className="text-xl">
          <h2>
            {patient.first_name} {patient.last_name}
          </h2>
          <p>{formatDate(patient.date_of_birth)}</p>
          <p>
            {patient.gender}
            {patient.gender == "F" ? "em" : ""}
            {"ale"}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
