import React from "react";

function ContactPerson({ name, email, phone }) {
  return (
    <div className="contact-person bg-green-100 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <p>
        Email:{" "}
        <a href={`mailto:${email}`} className="text-blue-500">
          {email}
        </a>
      </p>
      <p>Phone: {phone}</p>
    </div>
  );
}

export default ContactPerson;
