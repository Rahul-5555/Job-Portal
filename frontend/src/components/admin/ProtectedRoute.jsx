import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.role !== 'recruiter') {
            console.log("Redirecting to home...");
            navigate("/");
        }
    }, [user, navigate]); // Ensure the effect runs when `user` changes

    return (
        <>
            {user && user.role === 'recruiter' ? children : null}
        </>
    );
};

export default ProtectedRoute;
