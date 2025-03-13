import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  console.log(location.pathname, isAuthenticated, user);
  if (
    !isAuthenticated &&
    !["/auth/sign-in", "/auth/sign-up"].includes(location.pathname)
  ) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  if (
    isAuthenticated &&
    ["/auth/sign-in", "/auth/sign-up"].includes(location.pathname)
  ) {
    return <Navigate to="/chat" replace />;
  }
  if(isAuthenticated && user && location.pathname === "/") return <Navigate to="/chat" replace />

  return children;
};

export default CheckAuth;
