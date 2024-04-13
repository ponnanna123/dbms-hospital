import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";

const SignOut = () => {
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutStart());
      const response = await axios.get("/api/auth/sign-out");
      console.log(response.data);
      if (response.data.success) {
        dispatch(signOutFailure(response.data.message));
      }
      dispatch(signOutSuccess(response));
      navigate("/welcome");
    } catch (err) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-10 bg-white rounded shadow-md w-144 mr-10 mt-5"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-14">
            Are you sure you want to Log Out?
          </h2>
          <div className="mb-6 mt-8 text-center text-xl">
            <button
              className={`w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline 
                  ${
                    loading
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700"
                  }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Yes, sign me out"}
            </button>
          </div>
          <div>
            <span className="flex justify-center">
              <Link to={"/welcome"}>Back to Dashboard</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignOut;
