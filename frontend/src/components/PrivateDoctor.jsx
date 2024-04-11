import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateDoctor = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/welcome" />;
};

export default PrivateDoctor;
