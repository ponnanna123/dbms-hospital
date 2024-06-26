import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateWelcome = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    <Navigate
      to={
        currentUser.data.type === "P"
          ? "/dashboard/patient"
          : "/dashboard/doctor"
      }
    />
  ) : (
    <Outlet />
  );
};

export default PrivateWelcome;
