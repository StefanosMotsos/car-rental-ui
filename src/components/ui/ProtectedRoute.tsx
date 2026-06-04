import {useAuth} from "../../context/AuthProvider.tsx";
import {Navigate, useLocation} from "react-router-dom";

interface ProtectedRouteProps {
    role: "CUSTOMER" | "EMPLOYEE" | "ADMIN"
    children: React.ReactNode
}

const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>
}

export default ProtectedRoute