import React, { useState,useEffect } from "react";
import api from "../api/axios";
import axios from "axios";

function PatientForm() {
  const [shift, setShift] = useState(null); // Track selected shift
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    symptoms: "",
    visitDate: new Date().toISOString().split('T')[0],
    status: "waiting",
  });
  const [shiftCompleted, setShiftCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [completingShift, setCompletingShift] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPrescription, setShowPrescription] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (successMessage) {
      timeoutId = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
    
    // Cleanup function to clear timeout if component unmounts or message changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [successMessage]);

  const handleShiftSelection = (selectedShift) => {
    setShift(selectedShift);
    setShiftCompleted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await api.post("/api/patients", { ...patient, shift }); // Include shift info
      setSuccessMessage("تم إضافة المريض بنجاح!");
      setShowPrescription(true);
      setPatient({
        name: "",
        age: "",
        symptoms: "",
        visitDate: new Date().toISOString().split("T")[0],
        status: "waiting",
    });
    } catch (error) {
      setError(error.response?.data?.message || "فشل في إضافة المريض");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteShift = async () => {
    try {
      const payload = {
        shiftType: shift,
        date: new Date().toISOString(),
      };
      console.log("Sending payload:", payload);
      
      const response = await axios.put("https://patient-managment-backend.vercel.app/api/shifts/complete", payload);
      console.log("Shift completed:", response.data);
      
      // Directly set shift to null instead of setting shiftCompleted to true
      setShift(null);
    } catch (error) {
      console.error("Error completing shift:", error.response?.data || error.message);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleReturnToForm = () => {
    setShowPrescription(false);
    setPatient({
      name: "",
      age: "",
      symptoms: "",
      visitDate: new Date().toISOString().split("T")[0],
      status: "waiting",
    });
    setSuccessMessage("");
  };

  if (!shift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 font-cairo">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">اختيار فترة العمل</h2>
          <p className="text-gray-400">اختر فترة العمل الحالية قبل البدء بإضافة المرضى</p>
          <div className="space-x-4">
            <button
              onClick={() => handleShiftSelection("morning")}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
            >
              الفترة الصباحية
            </button>
            <button
              onClick={() => handleShiftSelection("night")}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              الفترة المسائية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 font-cairo">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 text-center">
          إضافة مريض جديد - {shift === "morning" ? "الفترة الصباحية" : "الفترة المسائية"}
        </h2>
        <p className="mt-2 text-center text-gray-400">أدخل بيانات المريض الجديد</p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-900/50 border border-green-700 text-green-200 rounded-lg animate-fade-in-out">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">اسم المريض</label>
            <input
              type="text"
              name="name"
              value={patient.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="أدخل اسم المريض..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">العمر</label>
            <input
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="أدخل عمر المريض..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">العنوان</label>
            <textarea
              name="symptoms"
              value={patient.symptoms}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              rows={4}
              placeholder="أدخل عنوان المريض..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              تاريخ الزيارة
            </label>
            <input
              type="date"
              name="visitDate"
              value={patient.visitDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-lg text-white font-medium transition-transform duration-200 transform hover:scale-[1.02] ${
            submitting
              ? "bg-violet-600/50 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700 active:scale-[0.98] shadow-lg shadow-violet-500/20"
          }`}
        >
          {submitting ? "جارٍ الإضافة..." : "إضافة المريض"}
        </button>
      </form>

      <button
        onClick={handleCompleteShift}
        disabled={completingShift}
        className={`mt-32 w-1/2 py-3 rounded-lg text-white font-medium transition-transform duration-200 transform hover:scale-[1.02] ${
          completingShift
            ? "bg-gray-500/50 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 active:scale-[0.98] shadow-lg shadow-red-500/20"
        }`}
      >
        {completingShift ? "جارٍ تسليم الشيفت..." : "تسليم الشيفت"}
      </button>
    </div>
  );
}

export default PatientForm;
