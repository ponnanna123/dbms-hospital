import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OAuth = ({ selectedOption }) => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await axios
        .post("/api/auth/google", {
          email: result.user.email,
          type: selectedOption,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/");
        });
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <div className="mb-6 mt-8 text-center transform -translate-y-8">
      <button
        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleGoogleLogin}
      >
        Continue With Google
      </button>
    </div>
  );
};

export default OAuth;
