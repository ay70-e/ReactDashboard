import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Bell, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  return (
  <nav
  className={`w-full flex items-center justify-between px-6 py-4 shadow-md z-20 transition-colors ${
    theme === "dark" ? "bg-[#141E30]" : "bg-[#ffedfe]"
  }`}
>


      {/* Left side */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-[#e0b3f5]">Dashboard</h1>
        
      </div>
       {/* center */}
      <div className="relative px-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
              : 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}
          className={`px-3 py-1 rounded-full flex items-center space-x-2 
            ${theme === 'dark' ? 'bg-[#141E30] ' : 'bg-[#ffedfe]  '}`}
          />
        </div>
      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          title="Notifications"
           style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
              : 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}
          className={`px-3 py-1 rounded-lg flex items-center space-x-2 
            ${theme === 'dark' ? 'bg-[#141E30] ' : 'bg-[#ffedfe]  '}`}
        >
          <Bell size={20} />
        </button>

        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
           style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
              : 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}
          className={`px-3 py-1 rounded-lg flex items-center space-x-2 
            ${theme === 'dark' ? 'bg-[#141E30] ' : 'bg-[#ffedfe]  '}`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
