// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading session...</div>

  if (!token) {
    console.log("Hit!");
    return <Navigate to="/api/login" replace />;
  }

  return <Outlet />;
}
