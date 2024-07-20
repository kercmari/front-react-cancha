import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ setToken }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign In</h2>
                <LoginForm setToken={setToken} />
                <div className="flex justify-between text-sm text-gray-600">
                    <a href="#" className="hover:text-gray-800">Forgot your password?</a>
                    <a href="/register-user" className="hover:text-gray-800">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
