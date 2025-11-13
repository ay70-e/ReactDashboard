import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import SystemPage from "./pages/SystemPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className="flex min-h-screen w-full bg-inherit">  
      {!hideLayout && <Sidebar />}
      <div className="flex-1 flex flex-col min-h-screen bg-inherit">
        {!hideLayout && <Navbar />}
        <main className="flex-1 p-6 bg-inherit">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isLoginPage
          ? "bg-[#ffedfe] text-black"
          : theme === "dark"
          ? "bg-[#141E30] text-white"
          : "bg-[#ffedfe] text-black"
      }`}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/analytics" element={<Layout><AnalyticsPage /></Layout>} />
        <Route path="/users" element={<Layout><UsersPage /></Layout>} />
        <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
        <Route path="/system" element={<Layout><SystemPage /></Layout>} />
        <Route path="/profile" element={<Layout><UserProfilePage /></Layout>} />
        <Route path="/notifications" element={<Layout><NotificationsPage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

