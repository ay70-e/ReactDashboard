// components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Users, Settings, Cpu, User, Bell, LogOut, BarChart2 } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const pages = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
    { name: "Users", path: "/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "System", path: "/system", icon: <Cpu size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Notifications", path: "/notifications", icon: <Bell size={20} /> },
  ];

  return (
    <aside
  className={`flex flex-col text-black transition-all duration-300   ${
    isOpen ? "w-64" : "w-16"
  } bg-[#e0b3f5] shadow-lg`}
>

      <div className="flex items-center justify-between p-3 shadow-md">
        <span className={`font-bold text-xl text-black ${isOpen ? "block" : "hidden"}`}>Dashboard</span>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      <nav className="flex-1 mt-4 text-foreground">
        {pages.map((page) => (
          <NavLink
          key={page.name}
          to={page.path}
          className={({ isActive }) =>
            `flex items-center ${
              isOpen ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
            } hover:bg-[#ffedfe] dark:hover:bg-pink-900/30 transition ${
              isActive ? "bg-[#ffedfe] dark:bg-pink-800/40 font-semibold" : ""
            }`
          }
        >
          {page.icon}
          {isOpen && <span>{page.name}</span>}
        </NavLink>

        ))}
      </nav>

      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-3 w-full px-4 py-3 mt-auto mb-4 hover:bg-red-100 dark:hover:bg-red-900/30 transition text-red-600"
      >
        <LogOut size={20} />
        {isOpen && <span>Logout</span>}
      </button>
    </aside>
  );
}
