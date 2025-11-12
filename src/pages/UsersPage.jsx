import React, { useState,useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { users as initialUsers } from "../data/mockData";
import { Download, Upload, UserPlus , Edit2, Trash2,MoreVertical} from "lucide-react";
import { Users, UserCheck, Shield, Building } from "lucide-react"; 
import { formatDistanceToNow } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UsersPage() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,   
    });
  }, []);

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "offline",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDepartment =
      selectedDepartment === "all" || user.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Stats
  const totalUsers = filteredUsers.length;
  const onlineUsers = filteredUsers.filter(u => u.status === "online").length;
  const adminUsers = filteredUsers.filter(u => u.role === "admin").length;
  const departments = new Set(filteredUsers.map(u => u.department)).size;

  const stats = [
    { label: "Total Users", value: totalUsers, color: "text-blue-600" },
    { label: "Online", value: onlineUsers, color: "text-pink-500" },
    { label: "Admins", value: adminUsers, color: "text-purple-600" },
    { label: "Departments", value: departments, color: "text-yellow-500" },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "manager":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "developer":
        return "bg-green-100 text-green-700 border-green-200";
      case "designer":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "analyst":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Edit user
  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role });
    setOpenDropdown(null);
  };

  const handleSave = () => {
    setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...form } : u));
    setEditingUser(null);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Add user
  const handleAddUser = e => {
    e.preventDefault();
    setUsers(prev => [...prev, { ...newUser, id: Date.now() }]);
    setNewUser({ name: "", email: "", role: "", department: "", status: "offline" });
    setShowAddForm(false);
  };

  // Export CSV
  const handleExport = () => {
    const csvContent = [
      Object.keys(users[0]).join(","),
      ...users.map(u => Object.values(u).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-1">Manage system users and their permissions</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className={`flex items-center gap-1 px-3 py-1 border rounded-lg cursor-pointer ${
              theme === "dark" ? "hover:bg-[#20293b]" : "bg-[#fffbff]"
            }`}
          >
            <Download className="w-4 h-4" /> Export
          </button>

          <label
            className={`flex items-center gap-1 px-3 py-1 border rounded-lg cursor-pointer ${
              theme === "dark" ? "hover:bg-[#20293b]" : "bg-[#fffbff]"
            }`}
          >
            <Upload className="w-4 h-4" /> Import
            <input type="file" accept=".csv" className="hidden" />
          </label>

          <button
            onClick={() => setShowAddForm(true)}
            className={`flex items-center gap-1 px-3 py-1 border rounded-lg cursor-pointer ${
              theme === "dark" ? "hover:bg-[#20293b]" : "bg-[#fffbff]"
            }`}
          >
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Stats */}
     
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {stats.map((stat,index) => ( <div data-aos="zoom-in-down" data-aos-delay={index * 200}>
           <div key={stat.label} className={`rounded-2xl shadow-lg dark:shadow-2xl p-6 transform transition-transform duration-300 hover:scale-105 flex items-center justify-between ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} >
             {/* Left side (text) */} 
             <div> 
              <p className={ `text-sm font-medium ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff] "}`}> {stat.label} </p>
               <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p> 
               </div>
                {/* Right side (icon) */}
                {stat.label === "Total Users" && ( <Users className="h-8 w-8 text-blue-500" /> )}
                {stat.label === "Online" && ( <UserCheck className="h-8 w-8 text-pink-500" /> )}
                {stat.label === "Admins" && ( <Shield className="h-8 w-8 text-purple-500" /> )}
                {stat.label === "Departments" && ( <Building className="h-8 w-8 text-yellow-500" /> )} 
                </div>
                </div> 
                  ))}
                     </div>

      {/* Filters */}
      <div data-aos="zoom-in-down" className={`rounded-2xl shadow-lg dark:shadow-2xl p-6 transform transition-transform duration-300 hover:scale-105 grid grid-cols-1 md:grid-cols-3 gap-2 ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`}>
        <div>
          <label className="text-sm font-medium mb-1 block">Search</label>
          <input type="text" placeholder="Search users..." className={`p-2 border rounded-lg w-full ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Department</label>
          <select className={`p-2 border rounded-lg w-full ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
            <option value="all">All Departments</option>
            {Array.from(new Set(users.map(u => u.department))).map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Status</label>
          <select className={`p-2 border rounded-lg w-full ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="away">Away</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className={`rounded-2xl shadow-lg dark:shadow-2xl p-6 transform transition-transform duration-300 hover:scale-105 space-y-4 ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`}>
          <h2 className="font-semibold">Add New User</h2>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className={`p-2 border rounded-lg ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} required />
            <input type="email" placeholder="Email" className={`p-2 border rounded-lg ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
            <input type="text" placeholder="Role" className={`p-2 border rounded-lg ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} required />
            <input type="text" placeholder="Department" className={`p-2 border rounded-lg ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={newUser.department} onChange={e => setNewUser({...newUser, department: e.target.value})} required />
            <select className={`p-2 border rounded-lg ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`} value={newUser.status} onChange={e => setNewUser({...newUser, status: e.target.value})}>
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
            <div className="flex items-center gap-2">
              <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-[#121620]">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div data-aos="zoom-in-down" className={`space-y-2 rounded-2xl shadow-lg dark:shadow-2xl p-6  ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`}>
        <h1 className="font-medium">Users ({users.length})</h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1">Manage and view all system users</p>

        {users.map(user => (
          <div key={user.id} className={`flex items-center justify-between p-4 border rounded-2xl ${theme === "dark" ? "hover:bg-[#20293b]" : "hover:bg-gray-100"} `}>
            {/* Left */}
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt={user.name} className="w-16 sm:w-8 md:w-8 lg:w-16 h-auto" />
              <div>
                <p className={`font-semibold ${theme === "dark" ? "text-[#fffbff]" : "text-[#20293b]"} `}>{user.name} <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>{user.role}</span></p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{user.title} • {user.department}</p>
                {user.lastActive && <p className="text-sm text-gray-500 dark:text-gray-300">Last active: {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}</p>}
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 relative">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${user.status === "online" ? "bg-green-100 text-green-700" : user.status === "away" ? "bg-yellow-100 text-yellow-700" : user.status === "busy" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{user.status || "offline"}</div>

              <button onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}>
                <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              </button>

              {openDropdown === user.id && (
                <div className={`absolute right-0 top-full mt-2 w-32 ${theme === "dark" ? "text-[#fffbff]" : "text-[#20293b]"}  border rounded shadow-lg z-10`}>
                  <button className={`flex items-center gap-2 px-4 py-2 text-sm w-full ${theme === "dark" ? "hover:bg-[#1c2636] ": "hover:bg-gray-100"} `}
                  onClick={() => openEditModal(user)}><Edit2 className="h-4 w-4 text-blue-500" /> Edit</button>
                  <button className={`flex items-center  gap-2 px-4 py-2 text-sm w-full ${theme === "dark" ? "hover:bg-[#1c2636] ": "hover:bg-gray-100"}`}
                   onClick={() => handleDeleteUser(user.id)}><Trash2 className="h-4 w-4 text-red-500" /> Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className={` ${theme === "dark" ? " bg-[#20293b]" : "bg-[#fffbff]"} text-[#20293b] p-6 rounded-xl w-80`}>
              <h2 className={` ${theme === "dark" ? "text-[#fffbff]" : ""} font-semibold mb-4`}>Edit User</h2>
              <input className={` ${theme === "dark" ? " bg-[#20293b] text-[#fffbff]" : "bg-[#fffbff]"} w-full mb-2 p-2 border rounded`}  placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className={` ${theme === "dark" ? " bg-[#20293b] text-[#fffbff]" : "bg-[#fffbff]"} w-full mb-2 p-2 border rounded`} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input className={` ${theme === "dark" ? " bg-[#20293b] text-[#fffbff]" : "bg-[#fffbff]"} w-full mb-2 p-2 border rounded`}  placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setEditingUser(null)}>Cancel</button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
