import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

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
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
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
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.data.profile_url}
                  alt="profile img"
                />
              ) : (
                <li className="hover:underline">Log In</li>
              )}
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
