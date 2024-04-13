import React from 'react';

function ContactUs() {
  return (
    <div className="container mx-auto py-8 bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('../../images/istockphoto-1271752802-612x612.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <h2 className="text-4xl font-bold text-center text-white mb-8 my-48">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-center ml-16 mr-16">
        <ContactPerson name="John Doe" email="john@example.com" phone="+1 (555) 123-4567" />
        <ContactPerson name="Jane Smith" email="jane@example.com" phone="+1 (555) 987-6543" />
        <ContactPerson name="Michael Johnson" email="michael@example.com" phone="+1 (555) 567-8901" />
      </div>
      <div className="text-center text-black mt-48">
        <p>For general inquiries, please contact us at <a href="mailto:info@example.com" className="text-blue-900 underline">info@example.com</a>.</p>
      </div>
    </div>
  );
}

function ContactPerson({ name, email, phone }) {
  return (
    <div className="contact-person bg-green-100 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <p>Email: <a href={`mailto:${email}`} className="text-blue-500">{email}</a></p>
      <p>Phone: {phone}</p>
    </div>
  );
}

export default ContactUs;
