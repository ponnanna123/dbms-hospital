import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const OAuth = () => {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await axios.post("/api/auth/google", {
        email: result.user.email,
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
        Register With Google
      </button>
    </div>
  );
};

export default OAuth;
