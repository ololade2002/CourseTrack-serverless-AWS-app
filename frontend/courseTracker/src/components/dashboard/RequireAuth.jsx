import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const RequireAuth = () => {
  const auth = useAuth();

  // still loading auth state
  if (auth.isLoading) {
    return <p className="p-6">Checking login…</p>;
  }

  // if not logged in, redirect to home
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // logged in -> allow access
  return <Outlet />;
};

export default RequireAuth;