import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <header className="bg-green-600 text-white py-5 px-10 fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-1">
          <img
            className="h-9 w-9"
            src="https://www.svgrepo.com/show/3102/blood-drop.svg"
            alt=""
          />
          <Link
            to={"/"}
            className="transition-colors duration-300 hover:text-green-100"
          >
            <h1 className="text-3xl font-bold">HealthHub</h1>
          </Link>
        </div>
        <nav className="flex items-center space-x-5">
          <ul className="flex space-x-5">
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li className="relative">
              {currentUser && currentUser.data ? (
                <>
                  <Link onClick={toggleDropdown}>
                    <img
                      className="rounded-full h-7 w-7 object-cover"
                      src={currentUser.data.profile_url}
                      alt="profile img"
                    />
                  </Link>
                  {dropdown && (
                    <ul className="absolute right-0 mt-2 bg-green-300 text-black rounded py-2 w-44 border border-black transition transform origin-top-right ease-out duration-200">
                      {currentUser.data.type === "P" ? (
                        <Link to="/new-appointment" onClick={toggleDropdown}>
                          <li className="px-3 py-1 hover:bg-green-400">
                            New Appointment
                          </li>
                        </Link>
                      ) : (
                        <Link to="/appointments" onClick={toggleDropdown}>
                          <li className="px-3 py-1 hover:bg-green-400">
                            Appointments
                          </li>
                        </Link>
                      )}
                      <Link to="/profile" onClick={toggleDropdown}>
                        <li className="px-3 py-1 hover:bg-green-400">
                          Profile
                        </li>
                      </Link>
                      <Link to="/sign-out" onClick={toggleDropdown}>
                        <li className="px-3 py-1 hover:bg-green-400">
                          Sign Out
                        </li>
                      </Link>
                    </ul>
                  )}
                </>
              ) : (
                <Link to="/sign-in" className="hover:underline">
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
