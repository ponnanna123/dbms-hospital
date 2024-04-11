import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivatePatient = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/welcome" />;
};

export default PrivatePatient;
