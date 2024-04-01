import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/sign-in",
        account
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5"
        >
          <h2 className="mb-5 text-3xl font-semibold text-center text-gray-700">
            Log In
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <div className="mb-6 mt-8 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
            <div className="flex justify-center">
              <p>
                Don't have an account?{" "}
                <span className="text-blue-600">
                  <Link to={"/sign-up"}>click here</Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
