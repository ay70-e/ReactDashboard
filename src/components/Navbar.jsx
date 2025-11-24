import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Bell, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // REAL NOTIFICATIONS
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace this with your real API call
    const fakeNotifications = [
      { id: 1, message: "New user registered" },
      { id: 2, message: "Server update available" },
      
    ];

    setNotifications(fakeNotifications);
  }, []);

  return (
    <nav
      style={{
        boxShadow:
          theme === "dark"
            ? "0 2px 4px rgba(0,0,0,0.6)"
            : "0 2px 6px rgba(255,105,180,0.25)",
      }}
      className={`w-full flex items-center justify-between px-6 py-4 z-20 transition-colors ${
        theme === "dark" ? "bg-[#141E30]" : "bg-[#ffedfe]"
      }`}
    >
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-[#e0b3f5]">Dashboard</h1>
      </div>

      <div className="relative px-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            boxShadow:
              theme === "dark"
                ? "inset 0 2px 4px rgba(0,0,0,0.6)"
                : "inset 0 2px 6px rgba(255,105,180,0.25)",
          }}
          className={`px-3 py-1 rounded-full ${
            theme === "dark" ? "bg-[#141E30]" : "bg-[#ffedfe]"
          }`}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* NOTIFICATION BUTTON */}
        <button
          onClick={() => navigate("/notifications")}
          title="Notifications"
          style={{
            boxShadow:
              theme === "dark"
                ? "inset 0 2px 4px rgba(0,0,0,0.6)"
                : "inset 0 2px 6px rgba(255,105,180,0.25)",
          }}
          className={`relative px-3 py-1 rounded-lg flex items-center ${
            theme === "dark" ? "bg-[#141E30]" : "bg-[#ffedfe]"
          }`}
        >
          <Bell size={20} />

          {/* Dynamic notification count */}
          {notifications.length > 0 && (
            <span className="absolute -top-[-5px] -right-[-11px] bg-red-500 text-white text-[6px] font-bold px-[3px] py-0.4 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* THEME SWITCH */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          style={{
            boxShadow:
              theme === "dark"
                ? "inset 0 2px 4px rgba(0,0,0,0.6)"
                : "inset 0 2px 6px rgba(255,105,180,0.25)",
          }}
          className={`px-3 py-1 rounded-lg flex items-center ${
            theme === "dark" ? "bg-[#141E30]" : "bg-[#ffedfe]"
          }`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
