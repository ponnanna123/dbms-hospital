import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateSignInUp = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/profile" /> : <Outlet />;
};

export default PrivateSignInUp;
