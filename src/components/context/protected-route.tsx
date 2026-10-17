import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";


export function ProtectedRoute({ role }: { role: "USER" | "ADMIN" }) {
  const { user, ready } = useAuth();
  if (!ready) return null;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== role) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  return <Outlet />;
}

export function HomeRedirect() {
  const { user, ready } = useAuth();
  if (!ready) return null;
  return <Navigate to={!user ? "/auth/login" : user.role === "ADMIN" ? "/admin" : "/user"} replace />;
}
