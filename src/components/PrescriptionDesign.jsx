import React, { useEffect } from 'react';
import elkoumi from "../assets/Elkoumi.jpg"

const PrescriptionDesign = ({ patientData, prescriptionData }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .prescription-container,
        .prescription-container * {
          visibility: visible;
        }
        .prescription-container {
          position: absolute;
          left: 0;
          top: 0;
        }
        @page {
          size: auto;
          margin: 0mm;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!patientData) {
    return <div className="p-4">No prescription data found.</div>;
  }

  const prescription = {
    patientName: patientData.name,
    age: patientData.age,
    date: patientData.visitDate,
    address: patientData.symptoms, // Using symptoms field for address
    medicines: prescriptionData?.medicines || [],
    instructions: prescriptionData?.instructions || '',
  };

  return (
    <div className="prescription-container relative h-screen w-full">
      <img 
        src={elkoumi}
        className="h-screen w-[40rem]" 
        alt="Prescription template"
      />
      
      {/* Overlaid Form Fields */}
      <div className="absolute top-0 left-0 w-[40rem] p-8">
        {/* Patient Information Fields - Adjusted positioning */}
        <div className="relative mt-32">
          {/* Name Field - الاسم */}
          <input 
            type="text"
            className="bg-transparent w-64 px-2 py-1 absolute right-24 top-[-14px] text-lg focus:outline-none text-right"
            value={prescription.patientName || ''}
            readOnly
            dir="rtl"
          />
          
          {/* Age Field - السن */}
          <input 
            type="text"
            className="bg-transparent w-32 px-2 py-1 absolute right-[420px] top-[-8px] text-lg focus:outline-none text-right"
            value={prescription.age || ''}
            readOnly
            dir="rtl"
          />
          
          {/* Address Field - العنوان */}
          <input 
            type="text"
            className="bg-transparent w-64 px-2 py-1 absolute right-24 top-[24px] text-lg focus:outline-none text-right"
            value={prescription.address || ''}
            readOnly
            dir="rtl"
          />
          
          {/* Date Field - التاريخ */}
          <input 
            type="text"
            className="bg-transparent w-32 px-2 py-1 absolute right-[420px] top-[24px] text-lg focus:outline-none text-right"
            value={new Date(prescription.date).toLocaleDateString('ar')}
            readOnly
            dir="rtl"
          />
        </div>

        {/* Medicines Section - Adjusted for Arabic layout */}
        <div className="relative mt-48 mr-8 space-y-8">
          {prescription.medicines.map((medicine, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-right" dir="rtl">
              <input
                type="text"
                className="bg-transparent border-b border-gray-400 px-2 py-1 focus:outline-none text-right"
                value={medicine.name || ''}
                readOnly
              />
              <input
                type="text"
                className="bg-transparent border-b border-gray-400 px-2 py-1 focus:outline-none text-right"
                value={medicine.dosage || ''}
                readOnly
              />
              <input
                type="text"
                className="bg-transparent border-b border-gray-400 px-2 py-1 focus:outline-none text-right"
                value={medicine.frequency || ''}
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        {prescription.instructions && (
          <div className="relative mt-8 mr-8">
            <textarea
              className="bg-transparent w-full border-none focus:outline-none resize-none text-right"
              value={prescription.instructions}
              readOnly
              rows={3}
              dir="rtl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionDesign;