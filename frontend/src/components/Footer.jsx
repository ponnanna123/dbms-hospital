import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-5 px-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-1">
          <img
            className="h-9 w-9"
            src="../../images/blood-drop.svg"
            alt="icon"
          />
          <h1 className="text-2xl font-bold">HealthHub</h1>
          <p className="ml-5">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav>
          <ul className="flex space-x-5">
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
