import { useEffect, useState } from "react";
import axios from "axios";
import ContactPerson from "../components/ContactPerson";

function Contact() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/info/admins");
        setAdmins(response.data.admins);
      } catch (error) {
        console.log("Failed to fetch admins", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div
      className="container mx-auto py-8 bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url('../../images/istockphoto-1271752802-612x612.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-4xl font-bold text-center text-white mb-8 my-48">
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-center ml-16 mr-16">
        {admins.map((admin) => (
          <div key={admin.admin_id}>
            <ContactPerson
              name={admin.admin_name}
              email={admin.admin_email}
              phone={admin.admin_phno}
            />
          </div>
        ))}
      </div>
      <div className="text-center text-black mt-48">
        <p>
          For general inquiries, please contact us at{" "}
          <a href="mailto:info@example.com" className="text-blue-900 underline">
            info@example.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Contact;
