// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// userToken có thể lấy từ localStorage hoặc context
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // nếu chưa login → redirect tới /login
        return <Navigate to="/login" replace />;
    }

    // nếu đã login → render component con
    return children;
};

export default ProtectedRoute;
