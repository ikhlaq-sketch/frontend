import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const accessToken = localStorage.getItem("access_token") || 
                       (JSON.parse(localStorage.getItem("user"))?.token);
    const userType = localStorage.getItem("userType");
    
    if (!accessToken || !allowedRoles.includes(userType)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;