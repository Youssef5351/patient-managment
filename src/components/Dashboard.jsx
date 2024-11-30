import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stats', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, [token]);

    if (!stats) return <p className="text-yellow-600">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold text-yellow-600 mb-8 font-cairo">لوحة معلومات الطبيب</h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-yellow-600 mb-4 font-cairo">فترة الصباح</h2>
                <p className="text-lg font-cairo">اجمالي المرضي: {stats.morningShift.count}</p>
                <p className="text-lg font-cairo">الارباح: {stats.morningShift.revenue}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-yellow-600 mb-4 font-cairo">فترة المساء</h2>
                <p className="text-lg font-cairo">اجمالي المرضي: {stats.nightShift.count}</p>
                <p className="text-lg font-cairo">الارباح: {stats.nightShift.revenue}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-yellow-600 mb-4 font-cairo">الاجمالي</h2>
                <p className="text-lg font-cairo">اجمالي المرضي: {stats.morningShift.count + stats.nightShift.count}</p>
                <p className="text-lg font-cairo">اجمالي الارباح: {stats.morningShift.revenue + stats.nightShift.revenue}</p>
            </div>
        </div>
    );
};

export default Dashboard;
