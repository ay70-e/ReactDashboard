import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { currentUser } from "../data/mockData";
import { Mail, Phone, MapPin, Calendar, Edit2, Check, X } from "lucide-react";

export default function UserProfilePage() {
  const { theme } = useContext(ThemeContext);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    avatar: currentUser.avatar,
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
    phone: "",
    location: "",
    joined: "11/11/2025",
    status: "Active",
  });
  const [tempData, setTempData] = useState({ ...user });

  const handleEditToggle = () => {
    if (editing) setTempData({ ...user });
    setEditing(!editing);
  };

  const handleSave = () => {
    setUser({ ...tempData });
    setEditing(false);
  };

  return (
    <div className="flex justify-center  ">
      <div style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
              : 'inset 0 2px 6px rgba(255, 105, 180, 0.25)'
          }}
        className={`flex flex-col md:flex-row w-full max-w-5xl  overflow-hidden transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Left Panel */}
        <div
          className={`md:w-1/3 flex flex-col items-center  justify-center p-6 ${theme === "dark" ? "bg-[#141E30]" : "bg-[#ffedfe]"}`}
        >
          <img
            src={tempData.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-md mb-4"
          />
          {editing ? (
            <input
              type="text"
              value={tempData.name}
              onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
              className="text-xl font-bold text-pink-700 text-center dark:text-pink-300 bg-transparent border-b border-pink-400 focus:outline-none mb-2"
            />
          ) : (
            <h2 className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-2">{user.name}</h2>
          )}
          <span className={`text-sm font-semibold ${user.role === "admin" ? "text-red-500" : "text-gray-600 dark:text-gray-300"}`}>
            {user.role}
          </span>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 grid grid-cols-1 gap-4">
          {/** Email */}
          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400">
              <Mail size={18} /> Email
            </span>
            {editing ? (
              <input
                type="email"
                value={tempData.email}
                onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                className="px-3 py-2 border-b border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded-md text-right bg-transparent"
              />
            ) : (
              <span>{user.email}</span>
            )}
          </div>

          {/** Phone */}
          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400">
              <Phone size={18} /> Phone
            </span>
            {editing ? (
              <input
                type="text"
                value={tempData.phone}
                onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                placeholder="No phone number"
                className="px-3 py-2 border-b border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded-md text-right bg-transparent"
              />
            ) : (
              <span>{user.phone || "No phone number"}</span>
            )}
          </div>

          {/** Location */}
          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400">
              <MapPin size={18} /> Location
            </span>
            {editing ? (
              <input
                type="text"
                value={tempData.location}
                onChange={(e) => setTempData({ ...tempData, location: e.target.value })}
                placeholder="No location set"
                className="px-3 py-2 border-b border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded-md text-right bg-transparent"
              />
            ) : (
              <span>{user.location || "No location set"}</span>
            )}
          </div>

          {/** Joined */}
          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-400">
              <Calendar size={18} /> Joined
            </span>
            <span>{user.joined}</span>
          </div>

          {/** Status */}
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Status</span>
            <span className={`font-semibold ${user.status === "Active" ? "text-green-500" : "text-gray-400"}`}>
              {user.status}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 shadow"
                >
                  <Check size={16} /> Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center gap-2 shadow"
                >
                  <X size={16} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg flex items-center gap-2 shadow"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
