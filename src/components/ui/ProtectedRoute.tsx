import {useAuth} from "../../context/AuthProvider.tsx";
import {Navigate, useLocation} from "react-router-dom";

interface ProtectedRouteProps {
    roles: ("CUSTOMER" | "EMPLOYEE" | "ADMIN")[]
    children: React.ReactNode
}

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>
}

export default ProtectedRoute