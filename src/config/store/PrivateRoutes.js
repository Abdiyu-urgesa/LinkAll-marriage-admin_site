import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./auth-context";
const PrivateRoutes = () => {
  const authCtx = useContext(AuthContext);
  return authCtx.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
