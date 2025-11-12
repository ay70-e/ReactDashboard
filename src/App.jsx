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
  const hideLayout = location.pathname === "/login"; // hide on login

  return (
    
    <div className={`flex min-h-screen transition-colors duration-500`}>
      {!hideLayout && <Sidebar />} {/* Sidebar hidden on login */}
      <div className="flex-1 flex flex-col">
        {!hideLayout && <Navbar />} {/* Navbar hidden on login */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={theme === "dark" ? "bg-[#141E30] text-white" : "bg-[#ffedfe] text-black"}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/system" element={<SystemPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
