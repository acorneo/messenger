import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            try {
                const response = await fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok && data.message === 'Registration successful') {
                    navigate('/login');
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
        }}
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Register</h2>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                    Username <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}
                />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                    Password <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
