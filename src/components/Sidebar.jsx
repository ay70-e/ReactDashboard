// components/Sidebar.jsx
import React, { useState,useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { Home, Users, Settings, Cpu, User, Bell, LogOut, BarChart2 } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const REMEMBER_KEY = "rememberedUser"; 

  const handleLogout = () => {
    localStorage.removeItem(REMEMBER_KEY);
    navigate("/login");
  };

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
      className={`flex flex-col text-black transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }  
       ${theme === "dark" ? "bg-purple-400" : "bg-[#e0b3f5]"}`}
    >
      <div style={{
            boxShadow: theme === 'dark' 
              ? ' 0 2px 4px rgba(0,0,0,0.3)' 
              : ' 0 2px 6px rgba(150, 100, 200, 0.35)'
          }} 
          className="flex items-center justify-between p-3 shadow-md">
        <span
          className={`font-bold text-xl text-black ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Dashboard
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      <nav className="flex-1 p-[0_0_0_10px] mt-4 text-foreground">
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.path}
            
className={({ isActive }) =>
  `flex items-center ${
    isOpen ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
  }

  transition

  ${
    isActive
      ? theme === "dark"
        ? "bg-[#141E30] text-white rounded-l-full shadow-[inset_4px_0_8px_rgba(0,0,0,0.6)]"
        : "bg-[#ffedfe] text-black rounded-l-full shadow-[inset_4px_0_8px_rgba(255,105,180,0.25)]"
      : ""
  }

  ${theme === "dark" ? "text-black" : "text-black"}
  `
}




          >
            {page.icon}
            {isOpen && <span>{page.name}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className={`flex items-center w-full ${
          isOpen ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
        } hover:bg-[#ffedfe] dark:hover:bg-pink-900/30 transition`}
      >
        <LogOut size={20} />
        {isOpen && <span>Logout</span>}
      </button>
    </aside>
  );
}
