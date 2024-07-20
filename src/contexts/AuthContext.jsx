import React, { createContext, useState, useEffect } from 'react';
import { refreshToken as refreshApiToken } from '../services/api';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {


    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');

    useEffect(() => {
        const interval = setInterval(() => {
            if (refreshToken) {
                refreshApiToken(refreshToken).then(response => {
                    setToken(response.data.access);
                    localStorage.setItem('token', response.data.access);
                }).catch(() => {
                    logout();
                });
            }
        }, 15 * 60 * 1000); // Refresh every 15 minutes

        return () => clearInterval(interval);
    }, [refreshToken]);

    const login = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setToken(token);
        setRefreshToken(refreshToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken('');
        setRefreshToken('');

    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
