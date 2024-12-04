import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "Doctor" && password === "Doctor402") {
      setAuth({ token: "doctor-token", role: "doctor" });
      navigate("/doctor");
    } else if (username === "Worker" && password === "Worker123") {
      setAuth({ token: "worker-token", role: "worker" });
      navigate("/");
    } else {
      alert("بيانات تسجيل الدخول غير صحيحة");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white font-cairo">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-xl font-cairo">
        <h2 className="text-3xl font-semibold text-indigo-400 mb-6 text-center font-cairo">تسجيل الدخول</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-indigo-300">اسم المستخدم</label>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm text-indigo-300">كلمة المرور</label>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-[100%] py-3 rounded-lg text-white font-medium transition-transform duration-200 transform hover:scale-[1.02] bg-violet-600 hover:bg-violet-700 active:scale-[0.98] shadow-lg shadow-violet-500/20 font-cairo"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default Login;
