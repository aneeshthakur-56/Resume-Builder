import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <Loader />;

  const isAuthenticated =
    user && (typeof user !== "object" || Object.keys(user).length > 0);
  if (!isAuthenticated)
    return <Navigate to={`/login${location.search}`} replace />;

  return children;
};

export default ProtectedRoute;
