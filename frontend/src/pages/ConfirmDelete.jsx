import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/user/userSlice";

const ConfirmDelete = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      let response1;
      if (currentUser.data.type === "P") {
        response1 = await axios.delete(
          `/api/user/delete/patient/${currentUser.data.account_id}`
        );
      } else if (currentUser.data.type === "D") {
        response1 = await axios.delete(
          `/api/user/delete/doctor/${currentUser.data.account_id}`
        );
      }

      if (response1) {
        console.log(response1.data);
        dispatch(deleteUserSuccess(response1.data));
      }

      try {
        dispatch(signOutStart());
        const response2 = await axios.post("/api/auth/sign-out");
        console.log(response2);
        dispatch(signOutSuccess(response2));
      } catch (error) {
        dispatch(signOutFailure(error.message));
      }
      setTimeout(() => {
        navigate("/welcome");
      }, 100);
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form className="p-10 bg-white rounded shadow-md w-144 mr-10 mt-5">
          <h1 className="text-red-500 font-semibold text-4xl text-center mb-8">
            Warning!
          </h1>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
            Are you sure you want to delete your account?
          </h2>
          <h3 className="text-red-600 text-center mb-10">
            (This action cannot be undone. All your data will be lost.)
          </h3>
          <div className="mb-6 mt-8 text-center text-xl">
            <button
              className={`w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline 
                      ${
                        loading
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700"
                      }`}
              type="button"
              onClick={handleDeleteUser}
              disabled={loading}
            >
              {loading ? "Loading..." : "Yes, delete my account"}
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

export default ConfirmDelete;
