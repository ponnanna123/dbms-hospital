import React from 'react';

// Sample blog data
const blogsData = [
  {
    id: 1,
    title: "How HealthHub is Revolutionizing Healthcare Access",
    author: "John Doe",
    content: "HealthHub is changing the game when it comes to accessing healthcare. With its user-friendly platform, patients can easily find and book appointments with top doctors from a variety of specialties. No more waiting weeks for an appointment - HealthHub puts the power back in the patient's hands.",
    date: "April 10, 2024"
  },
  {
    id: 2,
    title: "The Future of Telemedicine: HealthHub's Role in Remote Healthcare",
    author: "Jane Smith",
    content: "Telemedicine has become increasingly important in today's world, and HealthHub is at the forefront of this revolution. Through its virtual consultation feature, patients can connect with doctors from the comfort of their own homes, saving time and reducing the need for in-person visits.",
    date: "April 15, 2024"
  },
  {
    id: 3,
    title: "Empowering Patients: How HealthHub Puts You in Control of Your Health",
    author: "Michael Johnson",
    content: "Gone are the days of feeling powerless when it comes to managing your health. With HealthHub, patients have access to a wealth of information and resources to help them make informed decisions about their care. From educational articles to personalized health recommendations, HealthHub empowers individuals to take charge of their well-being.",
    date: "April 20, 2024"
  },
  {
    id: 4,
    title: "The Benefits of Centralized Healthcare Booking: A Look at HealthHub",
    author: "Emily Wilson",
    content: "HealthHub simplifies the healthcare booking process by centralizing appointments from multiple hospitals and clinics in one convenient platform. This not only saves time for patients but also streamlines administrative tasks for healthcare providers. With HealthHub, everyone wins.",
    date: "April 25, 2024"
  },
  {
    id: 5,
    title: "Innovation in Action: How HealthHub is Driving Change in the Healthcare Industry",
    author: "David Brown",
    content: "HealthHub is more than just a booking platform - it's a catalyst for innovation in healthcare. By leveraging technology to connect patients and providers, HealthHub is breaking down barriers and paving the way for a more accessible and efficient healthcare system. The future of healthcare starts here.",
    date: "April 30, 2024"
  }
];

const Blog = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9f9f9', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}>Discover Insights on HealthHub</h1>
      <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Latest Blogs</h2>
      {blogsData.map((blog, index) => (
        <div key={blog.id} style={{ width: '50%', marginBottom: '40px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 'bold', color: '#007bff' }}>{blog.title}</h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>By {blog.author} on {blog.date}</p>
          <p style={{ fontSize: '18px', color: '#444', lineHeight: '1.6' }}>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
