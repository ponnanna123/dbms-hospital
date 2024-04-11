import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          //   onSubmit={handleSubmit}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5 flex flex-col"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-14">
            Profile
          </h2>
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mb-16 -mt-5"
            src={currentUser.data.profile_url}
            alt="profile img"
          />
          <div className="mb-4 transform -translate-y-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              //   onChange={handleChange}
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
              //   onChange={handleChange}
            />
            <div className="mb-6 mt-8 text-center">
              <button
                className={`w-full px-4 py-2 font-bold text-white bg-green-500 hover:bg-green-700 disabled:bg-green-300 rounded-full focus:outline-none focus:shadow-outline`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update"}
              </button>
            </div>

            {/* <div className="text-center">
              <p style={{ color: "red" }}>
                {error && "Invalid email or password"}
              </p>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
