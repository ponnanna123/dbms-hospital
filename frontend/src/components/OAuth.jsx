import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const OAuth = ({ selectedOption }) => {
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await axios
        .post("/api/auth/google", {
          email: result.user.email,
          name: result.user.displayName,
          type: selectedOption,
          profile_url: result.user.photoURL,
        })
        .then((response) => {
          console.log(response.data);
          dispatch(signInSuccess(response));
          if (response.data.type === "P") {
            navigate(`/dashboard/patient`);
          } else if (response.data.type == "D") {
            navigate(`/dashboard/doctor`);
          } else {
            dispatch(signInFailure("Invalid account type"));
            return;
          }
        });
    } catch (err) {
      console.log("Could not sign in with Google", error);
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="mb-6 mt-8 text-center transform -translate-y-8">
      <button
        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 disabled:bg-red-300 focus:outline-none focus:shadow-outline"
        type="button"
        disabled={loading}
        onClick={handleGoogleLogin}
      >
        {loading ? "Loading..." : "Continue With Google"}
      </button>
    </div>
  );
};

export default OAuth;
