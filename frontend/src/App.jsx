 import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DepartmentDashboard from "./pages/department/DepartmentDashboard";
 import Certificate from "./pages/student/Certificate";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/department/:dept" element={<DepartmentDashboard />} />


        {/* ✅ CERTIFICATE */}
         <Route
  path="/certificate/:applicationId"
  element={<Certificate />}
/>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
