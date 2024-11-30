import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function DoctorPage() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
        const interval = setInterval(fetchPatients, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await api.get('/api/patients');
            setPatients(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            setLoading(false);
            setError('فشل في جلب قائمة المرضى. يرجى المحاولة مرة أخرى.');
        }
    };

    const handlePatientSelect = (patient) => {
        navigate('/treatment', { state: { patient } });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center font-cairo">
                <div className="text-gray-300 flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري التحميل...</span>
                </div>
            </div>
        );
    }
    

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center font-cairo">
                <div className="p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6 font-cairo">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-100 text-center">بوابة الطبيب</h2>
                    <p className="mt-2 text-center text-gray-400">
                        قائمة المرضى في قاعة الانتظار
                    </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    {patients.length === 0 ? (
                        <p className="text-center text-gray-400">لا يوجد مرضى في الانتظار</p>
                    ) : (
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {patients.map(patient => (
                                <div
                                    key={patient._id}
                                    onClick={() => handlePatientSelect(patient)}
                                    className="bg-gray-700 p-4 rounded-lg cursor-pointer 
                                             transition-all duration-200 hover:bg-gray-600 
                                             transform hover:scale-[1.02] active:scale-[0.98]
                                             border border-gray-600 hover:border-violet-500/50
                                             shadow-lg hover:shadow-violet-500/10"
                                >
                                    <div className="space-y-2">
                                        <h3 className="font-medium text-gray-100 text-lg">
                                            {patient.name}
                                        </h3>
                                        <div className="flex justify-between text-gray-300">
                                            <span>العمر:</span>
                                            <span>{patient.age}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-300">
                                            <span>تاريخ التسجيل:</span>
                                            <span dir="ltr">
                                                {new Date(patient.visitDate).toLocaleDateString('ar-EG')}
                                            </span>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-gray-600">
                                            <p className="text-gray-300">
                                                <span className="text-gray-400">العنوان: </span>
                                                {patient.symptoms}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorPage;