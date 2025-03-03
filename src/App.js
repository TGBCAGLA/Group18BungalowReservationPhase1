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
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <_Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bungalovlar" element={<BungalowsPage />} />
            <Route path="/bungalow/:bungalowId" element={<BungalowDetailPage />} /> 
            <Route path="/reservation/:bungalowId" element={<ReservationPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
          </Routes>
        </div>
        <_Footer />
      </div>
    </Router>
  );
};

export default App;
