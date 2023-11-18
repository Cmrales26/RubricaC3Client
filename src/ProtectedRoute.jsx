import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Loading from "./components/Loading";
const ProtectedRoute = () => {
  const { user, loading, isAuth } = useAuth();
  if (loading) return <Loading></Loading>;
  if (!loading && !isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
