import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div>
                    <Link to="/" className="text-xl font-bold text-purple-600">Canchas App</Link>
                </div>
                <nav className="flex space-x-4">
                    <Link to="/home" className="text-gray-600 hover:text-gray-800">Home</Link>
                    <Link to="/reservations" className="text-gray-600 hover:text-gray-800">Reservations</Link>
                    <Link to="/payments" className="text-gray-600 hover:text-gray-800">Payments</Link>

                </nav>
                <div className="flex items-center space-x-4">
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-gray-800">Sign in</Link>
                            <Link to="/register-user" className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
