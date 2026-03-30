// frontend/components/ProtectedRoute.js
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");

  if (!jwtToken) {
    // If token not found → redirect to login
    return <Redirect to="/login" />;
  }

  // If token exists → render the component
  return <Route {...props} />;
};

export default ProtectedRoute;