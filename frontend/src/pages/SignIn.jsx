import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    try {
      dispatch(signInStart());
      await axios
        .post("/api/auth/sign-in", account)
        .then((response) => {
          if (response.data.type === "P") {
            dispatch(signInSuccess(response));
            navigate("/dashboard/patient");
          } else if (response.data.type === "D") {
            dispatch(signInSuccess(response));
            navigate("/dashboard/doctor");
          } else {
            dispatch(signInFailure("Invalid account type"));
            return;
          }
        })
        .catch((error) => {
          dispatch(signInFailure(error.message));
        });
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-14">
            Log In
          </h2>
          <div className="mb-4 transform -translate-y-4">
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
          </div>
          <div className="mb-6 mt-8 text-center">
            <button
              className={`w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline 
                  ${
                    loading
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Log In"}
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
          <div className="text-center">
            <p style={{ color: "red" }}>
              {error && "Invalid email or password"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
