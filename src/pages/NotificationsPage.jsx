import React, { useState, useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { notifications as initialNotifications } from "../data/mockData";
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  Clock,
  Check,
  Trash2,
} from "lucide-react";

export default function NotificationsPage() {
  const { theme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case "info":
        return <Info className="text-blue-500" size={20} />;
      case "error":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Bell className="text-gray-400" size={20} />;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
          <Bell size={24} /> Notifications
        </h1>

        {notifications.length > 0 && (
          <button
            onClick={() => setNotifications([])}
            style={{
              boxShadow:
                theme === "dark"
                  ? "inset 0 2px 4px rgba(0,0,0,0.6)"
                  : "inset 0 2px 4px rgba(255,105,180,0.25)",
            }}
            className={`px-3 py-1 rounded-full flex items-center space-x-2 ${
              theme === "dark"
                ? "bg-[#141E30] text-pink-600"
                : "bg-[#ffedfe] text-pink-600"
            }`}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No notifications available.
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              data-aos="fade-up"
              className={`flex justify-between items-center p-4 rounded-xl border shadow-sm transition-all ${
                theme === "dark"
                  ? "bg-[#20293b] border-[#334155] text-[#fffbff]"
                  : "bg-[#fffbff] border-gray-200 text-[#20293b]"
              } ${!n.isRead ? "ring-2 ring-pink-400" : ""}`}
            >
              <div className="flex items-start gap-3">
                {getIcon(n.type)}
                <div>
                  <h3 className="font-semibold">
                    {n.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {n.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock size={12} />
                    {new Date(n.timestamp).toLocaleString()}
                  </div>
                  {n.link && (
                    <a
                      href={n.link}
                      className="text-pink-500 text-sm hover:underline mt-1 inline-block"
                    >
                      View details →
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleRead(n.id)}
                  className={`p-2 rounded-lg hover:scale-105 transition ${
                    n.isRead
                      ? "text-gray-400 hover:text-pink-500"
                      : "text-pink-600 hover:text-pink-400"
                  }`}
                  title={n.isRead ? "Mark as unread" : "Mark as read"}
                >
                  <Check size={18} />
                </button>

                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/40 transition text-red-500 hover:scale-105"
                  title="Delete notification"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
