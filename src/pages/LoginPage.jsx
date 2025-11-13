import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const REMEMBER_KEY = "rememberedUser";

  // Check if user already logged in
  useEffect(() => {
    const savedUserJSON = localStorage.getItem(REMEMBER_KEY);
    if (savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON);
      const now = new Date().getTime();
      if (now < savedUser.expiry) {
        navigate("/dashboard");
      } else {
        // expired
        localStorage.removeItem(REMEMBER_KEY);
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo credentials
    if (email === "admin@company.com" && password === "admin123") {
      setError("");

      if (remember) {
        // Save login info with expiry (30 days)
        const expiry = new Date().getTime() +   30 * 24 * 60 * 60 * 1000; // 30
        localStorage.setItem(
          REMEMBER_KEY,
          JSON.stringify({ email, expiry })
        );
      }

      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="p-8 px-8 flex flex-col items-center justify-center bg-[#ffedfe]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Sign in to your dashboard account</p>

        <div className="p-4 mb-6 border-l-4 border-yellow-400 bg-yellow-50 text-yellow-800 rounded-md">
          <strong>Security Notice:</strong> All login attempts are logged and monitored. Use only authorized credentials.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-pink-600 border-gray-300 rounded"
              />
              <span className="ml-2">Remember me for 30 days</span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Sign In
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-gray-500 text-sm">
        © 2025 Dashboard <br />
        All rights reserved | Version 1.0.0
      </p>

      <p className="mt-2 text-center text-gray-400 text-sm">
        Demo Credentials: <strong>admin@company.com / admin123</strong>
      </p>
    </div>
  );
}
