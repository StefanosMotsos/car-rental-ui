import {useAuth} from "../../context/AuthProvider.tsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return <Outlet/>
}

export default ProtectedRoute