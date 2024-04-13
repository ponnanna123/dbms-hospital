import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <main
      className="bg-cover bg-center min-h-screen pt-20 flex items-center justify-center z-10"
      style={{
        backgroundImage: "url('../../images/homepage.png')",
      
      }}
    >
      <div className="text-center p-10 bg-green-100 text-green-700 backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold mb-4">Your Health, Our Priority</h1>
        <p className="text-xl mb-8">
          Join us today and take the first step towards a healthier life.
        </p>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out hover:bg-green-700 transform hover:scale-110"
          onClick={() => navigate("/sign-up")}
        >
          Get Started
        </button>
      </div>
    </main>
  );
};

export default Welcome;
