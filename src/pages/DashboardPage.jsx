import React, { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Settings, BarChart2, Bell, Cpu, Wifi, HeartPulse, HardDrive } from "lucide-react";
import { dashboardStats, activities, systemHealth } from "../data/mockData";
import { ThemeContext } from "../contexts/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
      AOS.init({
        duration: 1000, 
        once: false,   
      });
    }, []);
  const quickLinks = [
    { name: "Analytics", icon: <BarChart2 size={26} className="text-[#463cd1]" />, path: "/analytics" },
    { name: "Users", icon: <Users size={26} className="text-[#9a47c1]" />, path: "/users" },
    { name: "Settings", icon: <Settings size={26} className="text-[#dc297a]" />, path: "/settings" },
    { name: "Notifications", icon: <Bell size={26} className="text-[#463cd1]" />, path: "/notifications" },
    { name: "System", icon: <Cpu size={26} className="text-[#9a47c1]" />, path: "/system" },
  ];

  return (
    <div
      className={`space-y-6 p-6 transition-all duration-300 ${
        theme === "dark" ? " text-white" : " text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className={`mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Key system metrics, health overview, and recent activities
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.slice(0, 4).map((stat, index) => (
          <div
            key={stat.id}
            data-aos="zoom-in-down"
            data-aos-delay={index * 100}
            className={`rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-105 ${
              theme === "dark" ? "bg-[#20293b]" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                {stat.title}
              </h2>
              <span className={`text-xl ${stat.color}`}>
                {stat.icon === "users" && <Users className="text-[#463cd1]" />}
                {stat.icon === "activity" && <Cpu className="text-[#9a47c1]" />}
                {stat.icon === "heart" && <HeartPulse className="text-[#dc297a]" />}
                {stat.icon === "hard-drive" && <HardDrive className="text-[#463cd1]" />}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p
              className={`text-sm mt-1 ${
                stat.trend.isPositive ? "text-[#463cd1]" : "text-[#dc297a]"
              }`}
            >
              {stat.trend.isPositive ? "▲" : "▼"} {stat.trend.value}% this week
            </p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div >
        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              data-aos="zoom-in-down"
              data-aos-delay={index * 150}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl font-medium shadow-lg hover:scale-105 transition ${
                theme === "dark" ? "bg-[#20293b] text-white" : "bg-white text-gray-800"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div
        
        className={`rounded-2xl shadow-lg p-6 transition-all duration-300 ${
          theme === "dark" ? "bg-[#20293b]" : "bg-white"
        }`}
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold">System Health Overview</h2>
          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
            Service uptime and performance metrics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemHealth.services.map((service, index) => (
            <div
              key={service.name}
              data-aos="fade-in"
              data-aos-delay={index * 150}
              className={`p-4 rounded-xl transition-all duration-300 ${
                theme === "dark" ? "bg-[#2b3248] hover:bg-[#353d57]" : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p
                    className={`text-sm ${
                      service.status === "up"
                        ? "text-[#463cd1]"
                        : service.status === "degraded"
                        ? "text-yellow-500"
                        : "text-[#dc297a]"
                    }`}
                  >
                    {service.status.toUpperCase()}
                  </p>
                </div>
                <Wifi className="text-[#9a47c1]" />
              </div>
              <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                Response: {service.responseTime} ms
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div
        data-aos="zoom-in-down"
        data-aos-delay="600"
        className={`rounded-2xl shadow-lg p-6 transition-all duration-300 ${
          theme === "dark" ? "bg-[#20293b]" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          {activities.slice(0, 5).map((activity) => (
            <li
              key={activity.id}
              className={`py-3 transition-all duration-300 ${
                theme === "dark" ? "hover:bg-[#2b3248]" : "hover:bg-gray-100"
              }`}
              
            >
              <p className="font-medium">{activity.title}</p>
              <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                {activity.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
