import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-red-600 text-white py-5 px-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="hover:text-gray-100">
          <h1 className="text-3xl font-bold">HealthHub</h1>
        </Link>
        <nav>
          <ul className="flex space-x-5">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sign-up" className="hover:underline">
                Register
              </Link>
            </li>
            <li>
              <Link to="/sign-in" className="hover:underline">
                Log In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
