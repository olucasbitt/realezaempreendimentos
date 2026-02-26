import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import InstitutionalPage from "./pages/InstitutionalPage";
import ProjectPage from "./pages/ProjectPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const WHATSAPP_NUMBER = "5551989066283";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar whatsappLink={WHATSAPP_LINK} />

      <Routes>
        <Route path="/" element={<InstitutionalPage />} />
        <Route path="/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}