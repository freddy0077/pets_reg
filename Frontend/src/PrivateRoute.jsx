import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../src/_store/index";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUserAuthentication = async () => {
            try {
                const response = await dispatch(authActions.getUser());

                if (response.type === "auth/user/fulfilled") {
                    setIsAuthenticated(true);
                } else {
                    throw new Error("Not authenticated");
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        if (authUser) {
            fetchUserAuthentication();
        } else {
            setLoading(false);
            setIsAuthenticated(false);
        }
    }, [authUser, dispatch, navigate]);

    if (loading) {
        return null;  // or return a loading spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;
