import React, { useState, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReservationPage from './pages/ReservationPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token && <Header />}
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute><ReservationPage /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/" element={token ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/register-user" element={<RegisterPage />} /> {/* Agrega la ruta de registro */}

      </Routes>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
