import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Spinner } from "react-bootstrap";

export function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
