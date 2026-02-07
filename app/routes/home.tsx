import React from "react";
import { Routes, Route } from "react-router"; // make sure react-router-dom ang import
import Layout from "../components/Layout"; 
import WelcomeIndex from "../welcome/index";
import WelcomeAbout from "../welcome/about";
import WelcomeContact from "../welcome/contact";
import WelcomePortfolio from "../welcome/portfolio";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<Layout />}>
        {/* Nested routes under Layout */}
        <Route path="/welcome" element={<WelcomeIndex />} />
        <Route path="/welcome/about" element={<WelcomeAbout />} />
        <Route path="/welcome/contact" element={<WelcomeContact />} />
        <Route path="/welcome/portfolio" element={<WelcomePortfolio />} />
      </Route>
    </Routes>
  );
}
