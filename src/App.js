import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import _Navbar from "./components/_Navbar.js";
import HomePage from "./pages/HomePage";
import BungalowsPage from "./pages/BungalowsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BungalowDetailPage from "./pages/BungalowDetailPage";
import ReservationPage from "./pages/ReservationPage";
import _Footer from "./components/_Footer";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import ManagerLogin from "./pages/ManagerLogin";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <_Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bungalows" element={<BungalowsPage />} />
            <Route
              path="/bungalow/:bungalowId"
              element={<BungalowDetailPage />}
            />
            <Route
              path="/reservation/:bungalowId"
              element={<ReservationPage />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/manager-login" element={<ManagerLogin />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          </Routes>
        </div>
        <_Footer />
      </div>
    </Router>
  );
};

export default App;
