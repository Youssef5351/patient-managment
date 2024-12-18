import React, { useState } from 'react';
import axios from 'axios';

function AddMedicineForm({ onMedicineAdded }) {
    const [medicine, setMedicine] = useState({ name: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
        const [medicines, setMedicines] = useState({
        tab: true,
        syr: true,
        cap: true,
        inj: true,
        solution: true,
        spray: true,
        lotion: true,
        eff: true,
        oint: true,
        drop: true,
        supp: true,
        gel: true,
        antibiotic: true,
        RingerSolution: true,
        SlineSolution: true,
        GlucoseSolution:true,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicine((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('https://patient-managment-backend.vercel.app/api/medicines/add', medicine);

            if (response.data) {
                setSuccessMessage(response.data.message || 'Medicine added successfully');

                const newMedicine = response.data.medicine || {
                    id: response.data.id,
                    name: response.data.name,
                };

                if (newMedicine && onMedicineAdded) {
                    onMedicineAdded({
                        label: newMedicine.name,
                        value: newMedicine.name,
                        id: newMedicine.id,
                    });
                    setMedicine({ name: '' });
                }
            }
        } catch (error) {
            console.error('Error adding medicine:', error);
            setErrorMessage(
                error.response?.data?.message ||
                'Failed to add medicine. Please try again.'
            );
        }
    };

    
    const getTextStyle = (isDone) => {
        return isDone
            ? "text-[#22CEB1] font-medium font-cairo" // Style for "Done"
            : "text-red-500 font-medium font-cairo"; // Style for "Not Done"
    };

    return (
         <div className="h-screen mx-auto p-6 bg-gray-900 shadow-lg rounded-lg text-gray-300 relative">
            <h2 className="text-3xl font-bold text-[#E3E3E3] mb-4 font-cairo">! اضف دواء جديد</h2>

            {successMessage && (
                <div className="mb-4 p-2 bg-green-800 text-green-400 border border-green-600 rounded">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mb-4 p-2 bg-red-800 text-red-400 border border-red-600 rounded">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#E3E3E3] mb-1 font-cairo">
                        اسم الدواء:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={medicine.name}
                        onChange={handleChange}
                        className="w-[60%] p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-[60%] py-3 rounded-lg text-white font-medium transition-transform duration-200 transform hover:scale-[1.02] bg-violet-600 hover:bg-violet-700 active:scale-[0.98] shadow-lg shadow-violet-500/20 font-cairo"
                >
                    ! اضف الدواء
                </button>
            </form>

            {/* Bottom-right corner lines */}
         <div className="absolute bottom-0 right-5 text-[#E3E3E3] bg-[#7839E5] py-[1.25rem] px-[7.5rem] rounded-3xl text-lg font-semibold text-right font-cairo">
                <p className={getTextStyle(medicines.tab)}>
                    {medicines.tab ? "منتهي" : "غير منتهي"}: Tab
                </p>
                <p className={getTextStyle(medicines.syr)}>
                    {medicines.syr ? "منتهي" : "غير منتهي"}: Syr
                </p>
                <p className={getTextStyle(medicines.cap)}>
                    {medicines.cap ? "منتهي" : "غير منتهي"}: Cap
                </p>
                <p className={getTextStyle(medicines.inj)}>
                    {medicines.inj ? "منتهي" : "غير منتهي"}: Inj
                </p>
                <p className={getTextStyle(medicines.solution)}>
                    {medicines.solution ? "منتهي" : "غير منتهي"}: Solution
                </p>
                <p className={getTextStyle(medicines.spray)}>
                    {medicines.spray ? "منتهي" : "غير منتهي"}: Spray
                </p>
                <p className={getTextStyle(medicines.lotion)}>
                    {medicines.lotion ? "منتهي" : "غير منتهي"}: Lotion
                </p>
                <p className={getTextStyle(medicines.eff)}>
                    {medicines.eff ? "منتهي" : "غير منتهي"}: Eff
                </p>
                <p className={getTextStyle(medicines.oint)}>
                    {medicines.oint ? "منتهي" : "غير منتهي"}: Oint
                </p>
                <p className={getTextStyle(medicines.drop)}>
                    {medicines.drop ? "منتهي" : "غير منتهي"}: Drops
                </p>
                <p className={getTextStyle(medicines.supp)}>
                    {medicines.supp ? "منتهي" : "غير منتهي"}: Supp
                </p>
                <p className={getTextStyle(medicines.gel)}>
                    {medicines.gel ? "منتهي" : "غير منتهي"}: Gel
                </p>
                <p className={getTextStyle(medicines.antibiotic)}>
                    {medicines.antibiotic ? "منتهي" : "غير منتهي"}: Antibiotic
                </p>
                <p className={getTextStyle(medicines.RingerSolution)}>
                    {medicines.RingerSolution ? "منتهي" : "غير منتهي"}: Ringer Solution
                </p>
                <p className={getTextStyle(medicines.SlineSolution)}>
                    {medicines.SlineSolution ? "منتهي" : "غير منتهي"}: Sline Solution
                </p>
                <p className={getTextStyle(medicines.GlucoseSolution)}>
                    {medicines.GlucoseSolution ? "منتهي" : "غير منتهي"}: Glucose Solution
                </p>
            </div>
        </div>
    );
}

export default AddMedicineForm;
