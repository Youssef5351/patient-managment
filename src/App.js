import React, { useState } from "react";
import "./App.css";
import PatientForm from "./components/PatientForm";
import DoctorPage from "./components/DoctorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TreatmentPage from "./components/TreatmentPage";
import PrescriptionPreview from "./components/PrescriptionPreview";
import PrescriptionDesign from "./components/PrescriptionDesign";
import AddMedicineForm from "./components/AddMedicineForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MedicineAdminList from "./components/MedicineAdminList";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute
import WorkerLogin from "./components/WorkerLogin"
function App() {
  const [auth, setAuth] = useState({ token: null, role: null }); // Token for authentication
  const [token, setToken] = useState(null)
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Worker Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={!!auth.token} role={auth.role} requiredRole="worker">
                <PatientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute isAuthenticated={!!auth.token} role={auth.role} requiredRole="doctor">
                <DoctorPage />
              </ProtectedRoute>
            }
          />
          <Route path="/treatment" element={<TreatmentPage />} />
          <Route path="/prescription" element={<PrescriptionPreview />} />
          <Route path="/prescription-design" element={<PrescriptionDesign />} />
          <Route path="/add-medicine" element={<AddMedicineForm />} />
          <Route path="/medicines" element={<MedicineAdminList />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard token={token} /> : <Login setToken={setToken} />}
          />
          <Route path="/login" element={<WorkerLogin setAuth={setAuth} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
