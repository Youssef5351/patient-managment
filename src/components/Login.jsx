import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            const token = response.data.token;
    
            // Store the token in localStorage or sessionStorage
            localStorage.setItem('token', token);
    
            // Optionally, you can call the parent function to store the token in the App state
            setToken(token);
        } catch (err) {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center font-cairo" dir="rtl">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg transform transition-all duration-500 hover:scale-105">
                <h2 className="text-center text-4xl font-semibold text-yellow-500 mb-6">تسجيل الدخول</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 placeholder-gray-400 text-white"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 placeholder-gray-400 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
                    >
                        دخول
                    </button>
                    {error && <p className="text-center text-red-500 mt-3">{error}</p>}
                </form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">دكتور؟</p>
                    <button className="text-yellow-500 hover:underline">تسجيل دخول</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
