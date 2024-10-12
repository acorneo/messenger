import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <h1 className="text-5xl font-bold text-white mb-8">Welcome to Messenger App</h1>
            <p className="text-xl text-gray-300 mb-8">Connect with your friends and family instantly.</p>
            <div className="flex space-x-4">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default MainPage;