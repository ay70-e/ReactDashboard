import React, { useState,useEffect,useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { Save, RefreshCw, Settings, Shield, Bell, Palette, Globe, Database } from "lucide-react";

const SettingsPage = () => {
    const { theme } = useContext(ThemeContext);
    
      useEffect(() => {
        AOS.init({
          duration: 1000, 
          once: true,   
        });
      }, []);
    
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "integrations", label: "Integrations", icon: Globe },

  ];

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert("Settings saved successfully!");
  };

  const renderGeneralSettings = () => (
    <div className=" grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div data-aos="zoom-in-down"
      className={`${theme === "dark" ? " bg-[#20293b] border-[#20293b]" : "bg-[#fffbff]"} p-5  rounded-2xl shadow-sm border space-y-4`}>
        <div>
          <h2 className="text-lg font-semibold">Application Settings</h2>
          <p className="text-sm text-gray-500">Basic application configuration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site Name</label>
            <input
              type="text"
              defaultValue="Universal Dashboard"
              className={`w-full border rounded-lg px-3 py-2 ${theme === "dark" ? " bg-[#20293b] " : "bg-[#fffbff]"}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Site URL</label>
            <input
              type="text"
              defaultValue="https://dashboard.example.com"
              className={`w-full border rounded-lg px-3 py-2 ${theme === "dark" ? " bg-[#20293b] " : "bg-[#fffbff]"}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            defaultValue="A comprehensive dashboard for managing your system"
            className={`w-full border rounded-lg px-3 py-2 ${theme === "dark" ? " bg-[#20293b] " : "bg-[#fffbff]"}`}
            
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <select className={`w-full border rounded-lg px-3 py-2 ${theme === "dark" ? " bg-[#20293b] " : "bg-[#fffbff]"}`} >

              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
              <option>GMT</option>
            </select>
          </div>
          <div>
            <label 
             className="block text-sm font-medium mb-1">Language</label>
            <select className={`w-full border rounded-lg px-3 py-2 ${theme === "dark" ? " bg-[#20293b] " : "bg-[#fffbff]"}`}>
              <option>English</option>
              <option>Arabic</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`p-5  rounded-2xl shadow-sm border space-y-4 ${theme === "dark" ? " bg-[#20293b] border-[#20293b]" : "bg-[#fffbff]"}`}
       data-aos="zoom-in-down">
        <div>
          <h2 className="text-lg font-semibold">System Settings</h2>
          <p className="text-sm text-gray-500">System-wide configuration options</p>
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <div>
            <p className="font-medium text-sm">Maintenance Mode</p>
            <p className="text-xs text-gray-500">Enable maintenance mode to restrict access</p>
          </div>
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={() => setMaintenanceMode(!maintenanceMode)}
            className="w-5 h-5 accent-pink-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <div>
            <p className="font-medium text-sm">Auto Updates</p>
            <p className="text-xs text-gray-500">Automatically install system updates</p>
          </div>
          <input
            type="checkbox"
            checked={autoUpdates}
            onChange={() => setAutoUpdates(!autoUpdates)}
            className="w-5 h-5 accent-pink-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium text-sm">Debug Mode</p>
            <p className="text-xs text-gray-500">Enable debug logging and verbose output</p>
          </div>
          <input
            type="checkbox"
            checked={debugMode}
            onChange={() => setDebugMode(!debugMode)}
            className="w-5 h-5 accent-pink-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      default:
        return (
          <div className="">
            Coming soon...
          </div>
        );
    }
  };

  return (
   <div className="space-y-6">
  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-gray-500 mt-1">
        Configure your application settings and preferences
      </p>
    </div>
    <button
      onClick={handleSave}
      disabled={isLoading}
      style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
              : 'inset 0 2px 4px rgba(255, 105, 180, 0.25)'
          }}
          className={`px-3 py-1 rounded-md flex items-center space-x-2 
            ${theme === 'dark' ? 'bg-rgba(255, 255, 255, 0.8) ' : 'bg-rgba(255, 255, 255, 0.05) '}`}
        
    >
      {isLoading ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4 " />
      )}
      Save
    </button>
  </div>

  {/* Horizontal Tabs  */}
  <div className={` ${theme === "dark" ? " text-[#fffbff] " : "bg-[#fffbff]"} border rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-2 p-3`}>
  {tabs.map((tab, index) => {
    const Icon = tab.icon;
    return (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        data-aos="fade-in"
        data-aos-delay={index * 150}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors text-gray-700 hover:text-pink-600"
      >
        <Icon
          className={`h-4 w-4 transition-colors ${theme === "dark" ? " text-[#fffbff] " : "text-gray-700"}
            ${
            activeTab === tab.id ? "text-pink-600" : " group-hover:text-pink-600"
          }`}
        />
        <span
          className={`relative ${theme === "dark" ? " text-[#fffbff] " : ""}
            ${
            activeTab === tab.id
              ? "text-pink-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-pink-600 after:content-['']"
              : ""
          }`}
        >
          {tab.label}
        </span>
      </button>
    );
  })}
</div>


  {/* Content Section */}
  <div className="">
    {renderTabContent()}
  </div>
</div>
  );
};

export default SettingsPage;
