import React from 'react';
import RegisterForm from './components/RegisterForm';

const RegisterScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <RegisterForm />
        </div>
    );
};

export default RegisterScreen;