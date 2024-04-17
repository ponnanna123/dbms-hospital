import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(undefined);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (imageFile) {
      handleImageUpload(imageFile);
    }
  }, [imageFile]);

  const handleImageUpload = async (imageFile) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profile_url: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setImageFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    const response = await axios.post(
      `/api/user/update/${currentUser.data.account_id}`,
      formData
    );
    try {
      dispatch(updateUserSuccess(response));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-10 bg-white rounded shadow-md w-96 mr-10 mt-5 flex flex-col"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-14">
            Profile
          </h2>
          <input
            onChange={handleChange}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mb-16 -mt-5"
            src={
              formData.profile_url ||
              (currentUser && currentUser.data
                ? currentUser.data.profile_url
                : "")
            }
            alt="profile img"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-center transform -translate-y-10">
            {uploadError ? (
              <span className="text-red-600">
                Image upload failed! (image must be less than 5mb)
              </span>
            ) : uploadPercent > 0 && uploadPercent < 100 ? (
              <span>{`Uploading: ${uploadPercent}%`}</span>
            ) : uploadPercent === 100 ? (
              <span className="text-green-600">Image upload complete!</span>
            ) : (
              ""
            )}
          </p>
          <div className="mb-4 transform -translate-y-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Username
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              defaultValue={
                currentUser && currentUser.data ? currentUser.data.username : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 transform -translate-y-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              defaultValue={
                currentUser && currentUser.data ? currentUser.data.email : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 transform -translate-y-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              onChange={handleChange}
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
          </div>
          <div className="flex justify-between  transform -translate-y-5">
            <span
              onClick={() => navigate("/confirm-delete")}
              className="text-red-600 rounded-full px-3 py-1 font-bold cursor-pointer hover:text-white hover:bg-red-600"
            >
              Delete Account
            </span>
            <span
              onClick={() => navigate("/sign-out")}
              className="text-red-600 rounded-full px-3 py-1 font-bold cursor-pointer hover:text-white hover:bg-red-600"
            >
              Sign Out
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
