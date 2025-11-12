import { useState, useEffect,useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Monitor, Server, Cpu, MemoryStick, HardDrive, Wifi, RefreshCw, Download, Activity, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

const SystemPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const systemHealth = {
    status: "healthy",
    uptime: "98%",
    metrics: { cpu: 45, memory: 60, disk: 70, network: 20 },
    services: [
      { name: "Database", status: "up", lastCheck: new Date((Date.now() - 2 * 60 * 60 * 1000)), responseTime: 120 },
      { name: "API Server", status: "degraded", lastCheck: new Date(Date.now() - 15 * 60 * 1000), responseTime: 250 },
      { name: "Web Server", status: "down", lastCheck: new Date(Date.now() - 5 * 60 * 60 * 1000), responseTime: 0, },
    ],
    lastUpdated: new Date(),
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "up": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "down": return <XCircle className="h-4 w-4 text-red-500" />;
      case "degraded": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-gray-500 mt-1">Monitor system health, performance, and services</p>
        </div>
        <div className="flex items-center gap-2">
          <button  style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
              : 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}
          className={`px-3 py-1 rounded-md flex items-center space-x-2 
            ${theme === 'dark' ? 'bg-rgba(255, 255, 255, 0.8) ' : 'bg-rgba(255, 255, 255, 0.05) '}`}>
            <Download className="h-4 w-4" />
          </button>
           <button  style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
              : 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}
          className={`px-3 py-1 rounded-md flex items-center space-x-2 
            ${theme === 'dark' ? 'bg-rgba(255, 255, 255, 0.8) ' : 'bg-rgba(255, 255, 255, 0.05) '}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} /> 
          </button>
        </div>
      </div>

      {/* System Overview */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {[
    { title: "System Status", value: systemHealth.status, icon: Monitor, color: "text-green-500" },
    { title: "Uptime", value: systemHealth.uptime, icon: Activity, color: "text-blue-500" },
    { title: "Services", value: `${systemHealth.services.filter(s => s.status === "up").length}/${systemHealth.services.length}`, icon: Server, color: "text-purple-500" },
    { title: "Last Updated", value: "2 hours ago", icon: RefreshCw, color: "text-pink-500" },
  ].map((item, index) => (
    <div
      key={index}
      data-aos="zoom-in-up"
      data-aos-delay={index * 200}
    >
    
      <div className={`${theme === "dark" ? " bg-[#20293b] border-[#20293b] text-[#fffbff]" : "bg-[#fffbff]"} rounded-2xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium ">{item.title}</p>
            <p className={`text-sm font-bold capitalize ${item.color}`}>{item.value}</p>
          </div>
          <item.icon className={`h-6 w-6 ${item.color}`} />
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Resource Usage */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "CPU Usage", value: systemHealth.metrics.cpu, icon: Cpu, color: "text-green-500" },
          { title: "Disk Usage", value: systemHealth.metrics.disk, icon: HardDrive, color: "text-blue-500" },
  { title: "Memory Usage", value: systemHealth.metrics.memory, icon: MemoryStick, color: "text-purple-500" },
          { title: "Network Usage", value: systemHealth.metrics.network, icon: Wifi, color: "text-pink-500" },
        ].map((metric, index) => (
          <div
            key={index}
            data-aos="zoom-in-down"
            data-aos-delay={index * 150}
          >
            <div className={`${theme === "dark" ? " bg-[#20293b] border-[#20293b]" : "bg-[#fffbff]"} rounded-2xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm font-medium">{metric.title}</span>
              </div>
              <span className="text-sm font-bold">{metric.value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
                className={`h-2 rounded-full ${
                ["bg-green-500","bg-blue-500",  "bg-purple-500","bg-pink-500" ][index]
                }`}
                style={{ width: `${metric.value}%` }}
            />
            </div>

          </div></div>
        ))}
      </div>

      {/* Service Status */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemHealth.services.map((service, index) => (
          <div
            key={index}
            data-aos="zoom-in-down"
            data-aos-delay={index * 100}
            >
               
  <div className={`h-[90px] ${theme === "dark" ? " bg-[#20293b] border-[#20293b]" : "bg-[#fffbff]"} rounded-2xl shadow-lg p-2 flex justify-between items-center transform transition-transform duration-300 hover:scale-105`}>
            <div className="flex items-center gap-3">
              {getStatusIcon(service.status)}
              <div>
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-gray-500">
                  Last check: {formatDistanceToNow(service.lastCheck, { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {service.responseTime && <span className="text-sm text-gray-500">{service.responseTime}ms</span>}
              <span className={`px-2 py-1 text-xs rounded-full border ${
                service.status === "up" ? "bg-green-100 text-green-700 border-green-200" :
                service.status === "down" ? "bg-red-100 text-red-700 border-red-200" :
                "bg-yellow-100 text-yellow-700 border-yellow-200"
              }`}>{service.status}</span>
            </div>
          </div></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* System Information */}
  <div  data-aos="zoom-in-down" 
  className={`${theme === "dark" ? " bg-[#20293b] border-[#20293b]" : "bg-[#fffbff]"} border rounded-2xl shadow-lg p-6 `}>
    <div className="mb-4">
      <h2 className="text-lg font-semibold">System Information</h2>
      <p className="text-sm text-gray-500">Basic system details and specifications</p>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Operating System</span>
        <span className="text-sm text-gray-500">Ubuntu 22.04 LTS</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">Kernel Version</span>
        <span className="text-sm text-gray-500">5.15.0-91-generic</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">Architecture</span>
        <span className="text-sm text-gray-500">x86_64</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">Total Memory</span>
        <span className="text-sm text-gray-500">16 GB</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">Total Storage</span>
        <span className="text-sm text-gray-500">500 GB SSD</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">CPU Cores</span>
        <span className="text-sm text-gray-500">8 cores</span>
      </div>
    </div>
  </div>

  {/* Application Information */}
  <div data-aos="zoom-in-down" 
  className={`${theme === "dark" ? " bg-[#20293b] border-[#20293b]" : "bg-[#fffbff]"} border rounded-2xl shadow-lg p-6 `}>
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Application Information</h2>
      <p className="text-sm text-gray-500">Application version and build details</p>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Application Version</span>
        <span className="text-sm text-gray-500">v1.0.0</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">Build Date</span>
        <span className="text-sm text-gray-500">2024-01-15</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">Node.js Version</span>
        <span className="text-sm text-gray-500">v18.17.0</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-medium">Database Version</span>
        <span className="text-sm text-gray-500">PostgreSQL 14.9</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Environment</span>
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 border border-green-200">
          Production
        </span>
      </div>
    </div>
  </div>
</div>

{/* Recent Logs */}
<div data-aos="zoom-in-down" 
  className={`${theme === "dark" ? " bg-[#20293b] border-[#20293b]" : "bg-[#fffbff]"} border rounded-2xl shadow-lg p-6 `}>
  <div className="mb-4">
    <h2 className="text-lg font-semibold">Recent System Logs</h2>
    <p className="text-sm text-gray-500">Latest system events and logs</p>
  </div>
  <div className="flex flex-col gapx-3  overflow-y-auto">
    {[
      { level: "INFO", message: "System health check completed successfully", time: "2 min ago" },
      { level: "INFO", message: "User authentication successful for admin@example.com", time: "8 min ago" },
      { level: "INFO", message: "Scheduled backup completed successfully", time: "1 hr ago" },
      { level: "ERROR", message: "Failed to connect to external API service", time: "12 min ago" },
      { level: "WARN", message: "High memory usage detected on database server", time: "5 min ago" },
    ].map((log, index) => (
    <div
  key={index}
  className={`${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"} p-3 rounded-lg`}
>
  <div
    className={`border rounded-2xl px-4 py-1 mb-0
      ${log.level === "ERROR" ? "bg-red-100 text-red-700 border-red-200" :
        log.level === "WARN" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
        "bg-blue-100 text-blue-700 border-blue-200"}`}
  >
    <div className="flex justify-between items-center ">
      <span className="text-xs font-medium">{log.level}</span>
       <span className="text-xs py-1 text-gray-500 text-center">{log.message}</span>
  <span className="text-[10px] text-gray-500">{log.time}</span>
    </div>
   
  </div>
  
</div>



    ))}
  </div>
</div>

    </div>
  );
};

export default SystemPage;
