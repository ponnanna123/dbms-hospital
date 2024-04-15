import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/welcome" />;
};

export default PrivateDashboard;
