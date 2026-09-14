import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../api/apiFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check logged-in user when app starts
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) {
                    setUser(null);
                    return;
                }

                const response = await apiFetch(
                    "/api/auth/profile"
                );

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const data = await response.json();

                setUser(data.user);

            } catch (error) {
                console.error(
                    "Auth check error:",
                    error
                );

                setUser(null);

            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login
    const login = (
        userData,
        accessToken,
        refreshToken
    ) => {
        localStorage.setItem(
            "accessToken",
            accessToken
        );

        localStorage.setItem(
            "refreshToken",
            refreshToken
        );

        console.log("LOGIN USER SET:", userData);

        setUser(userData);
    };

    // Logout
    const logout = async () => {
        try {
            const refreshToken =
                localStorage.getItem("refreshToken");

            await apiFetch(
                "/api/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        refreshToken
                    })
                }
            );

        } catch (error) {
            console.error(
                "Logout error:",
                error
            );

        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                loading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};