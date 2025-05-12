"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

const AuthContext = createContext();
const BASE_URL = process.env.NEXT_PUBLIC_API_URL
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname(); 

    const checkAuth = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/auth/me`, { withCredentials: true });
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        checkAuth();
    }, [pathname]);


    const login = async (credentials) => {
        const res = await axios.post(`${BASE_URL}/api/auth/login`, credentials, {
            withCredentials: true,
        });
        setUser(res.data.user);
    };

    const logout = async () => {
        await axios.post(`${BASE_URL}/api/auth/logout`, {}, {
            withCredentials: true,
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);