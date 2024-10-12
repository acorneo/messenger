import React from 'react';
import LoginForm from './components/LoginForm';

const LoginScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <LoginForm />
        </div>
    );
};

export default LoginScreen;