// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PrescriptionPreview = ({ prescriptionId }) => {
//   const [prescription, setPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPrinting, setIsPrinting] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const printFrameRef = useRef(null);

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       try {
//         const response = await axios.get(`/api/prescriptions/${prescriptionId}`);
//         setPrescription(response.data);
//       } catch (error) {
//         console.error('Error fetching prescription:', error);
//       }
//     };
//     fetchPrescription();
//   }, [prescriptionId]);

//   const handlePrint = () => {
//     if (!prescription) {
//       alert('No prescription data to print.');
//       return;
//     }

//     setIsPrinting(true);

//     // Create an iframe if it doesn't exist
//     if (!printFrameRef.current) {
//       const iframe = document.createElement('iframe');
//       iframe.style.display = 'none';
//       document.body.appendChild(iframe);
//       printFrameRef.current = iframe;
//     }

//     const printContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Medical Prescription</title>
//         <style>
//           @page {
//             size: A4;
//             margin: 0;
//           }
//           body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//           }
//           .container {
//             position: relative;
//             width: 100%;
//             height: 100vh;
//             background-image: url('file-path-to-your-image/shabana.jpg');
//             background-size: cover;
//             background-position: center;
//           }
//           .text {
//             position: absolute;
//             font-size: 16px;
//             color: #000;
//           }
//           .patient-name {
//             top: 80px; /* Adjust as needed */
//             left: 100px; /* Adjust as needed */
//           }
//           .date {
//             top: 120px; /* Adjust as needed */
//             left: 100px; /* Adjust as needed */
//           }
//           .treatment {
//             top: 300px; /* Adjust as needed */
//             left: 100px; /* Adjust as needed */
//           }
//           /* Add more classes or styles to position other text fields */
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="text patient-name">Name: ${prescription.patientName}</div>
//           <div class="text date">Date: ${new Date(prescription.createdAt).toLocaleDateString()}</div>
//           <div class="text treatment">Treatment: ${prescription.treatment.replace(/\n/g, '<br>')}</div>
//         </div>
//       </body>
//     </html>
//   `;
  

//     const iframe = printFrameRef.current;
//     const iframeDoc = iframe.contentWindow.document;
//     iframeDoc.open();
//     iframeDoc.write(printContent);
//     iframeDoc.close();

//     iframe.onload = () => {
//       try {
//         iframe.contentWindow.print();
//       } catch (err) {
//         console.error('Print failed:', err);
//         alert('Failed to print. Please try again.');
//       } finally {
//         setIsPrinting(false);
//       }
//     };
//   };

//   if (loading) {
//     return (
//       <div className="max-w-2xl mx-auto p-4">
//         <p>Loading prescription...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto p-4">
//         <p className="text-red-500">{error}</p>
//         <button 
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!prescription) {
//     return (
//       <div className="max-w-2xl mx-auto p-4">
//         <p>No prescription found</p>
//         <button 
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="border rounded-lg p-6 mb-4 shadow-sm">
//         <div className="text-center mb-6 border-b pb-4">
//           <h2 className="text-2xl font-bold">{prescription.doctorName}</h2>
//           <p className="text-gray-600">
//             Date: {new Date(prescription.createdAt).toLocaleDateString()}
//           </p>
//         </div>

//         <div className="mb-4">
//           <p><strong>Patient ID:</strong> {prescription.patientId}</p>
//         </div>

//         <div className="my-6 p-4 bg-gray-50 rounded whitespace-pre-line">
//           {prescription.treatment}
//         </div>

//         <div className="mt-8 pt-4 border-t">
//           <p><strong>Doctor's Signature:</strong> _______________________</p>
//           <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
//         </div>
//       </div>

//       <div className="flex space-x-4">
//         <button
//           onClick={handlePrint}
//           disabled={isPrinting}
//           className={`${
//             isPrinting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
//           } text-white px-6 py-2 rounded transition-colors`}
//         >
//           {isPrinting ? 'Printing...' : 'Print Prescription'}
//         </button>
        
//         <button 
//           onClick={() => navigate(-1)}
//           className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionPreview;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrescriptionPreview = () => {
  const { prescriptionId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const navigate = useNavigate();
  const printFrameRef = useRef(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`/api/prescriptions/${prescriptionId}`);
        setPrescription(response.data);
      } catch (error) {
        console.error('Error fetching prescription:', error);
      }
    };
    fetchPrescription();
  }, [prescriptionId]);

  const handlePrint = () => {
    if (!prescription) return;

    setIsPrinting(true);
    if (!printFrameRef.current) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      printFrameRef.current = iframe;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page { size: A4; margin: 0; }
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .container {
              width: 100%; height: 100vh;
              background: url('/path-to-your-image.jpg') center/cover no-repeat;
            }
            .text { position: absolute; color: black; font-size: 16px; }
            .patient-name { top: 50px; left: 50px; }
            .date { top: 100px; left: 50px; }
            .treatment { top: 200px; left: 50px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="text patient-name">Name: ${prescription.patientName}</div>
            <div class="text date">Date: ${new Date(prescription.createdAt).toLocaleDateString()}</div>
            <div class="text treatment">Treatment: ${prescription.treatment.replace(/\n/g, '<br>')}</div>
          </div>
        </body>
      </html>
    `;

    const iframe = printFrameRef.current;
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(printContent);
    iframeDoc.close();

    iframe.onload = () => {
      iframe.contentWindow.print();
      setIsPrinting(false);
    };
  };

  if (!prescription) return <p>Loading prescription...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{prescription.doctorName}</h2>
      <p className="mb-4">Date: {new Date(prescription.createdAt).toLocaleDateString()}</p>
      <p className="mb-6">{prescription.treatment}</p>
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isPrinting ? 'Printing...' : 'Print Prescription'}
      </button>
      <button
        onClick={() => navigate(-1)}
        className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Go Back
      </button>
      
    </div>
  );
};

export default PrescriptionPreview;
