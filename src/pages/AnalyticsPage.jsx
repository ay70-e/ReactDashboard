import React, { useContext } from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import Metrics from '../components/Metrics';
import Barcard from '../components/ChartCard/Barcard';
import Piecard from '../components/ChartCard/Piecard';
import Areacard from '../components/ChartCard/Areacard';
import DonutCard from  '../components/ChartCard/DonutCard';
import Linecard from '../components/ChartCard/Linecard'
import { ThemeContext } from "../contexts/ThemeContext";

const AnalyticsPage = () => {
const { theme } = useContext(ThemeContext);

  return (
    <div className="space-y-6 p-6 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analytics and insights for your system
          </p>
        </div>
      </div>

      {/* Key Metrics */}
     <Metrics />
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  <div data-aos="zoom-in-up" data-aos-delay="0">
    <Linecard />
  </div>
  <div data-aos="zoom-in-up" data-aos-delay="200">
    <Barcard chartId="2" />
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div data-aos="zoom-in-up" data-aos-delay="0">
    <Piecard chartId="6" />
  </div>
  <div data-aos="zoom-in-up" data-aos-delay="200">
    <Piecard chartId="7" />
  </div>
  <div data-aos="zoom-in-up" data-aos-delay="400">
    <DonutCard chartId="2" />
  </div>
</div>

      
      {/* Performance Metrics */}    
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Performance Trends Table */}

  <div  data-aos="zoom-in-up"       
    data-aos-delay="0"  
  className={`lg:col-span-2 rounded-2xl shadow-lg p-6 transition-all duration-300 
  ${theme === 'dark' ? 'bg-[#20293b] shadow-2xl' : 'bg-[#fffbff]'}`}
>
  <div className="mb-4">
    <h2
      className={`text-lg font-bold ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}
    >
      Performance Trends
    </h2>
    <p
      className={`text-sm ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
      }`}
    >
      System performance over time
    </p>
  </div>

  <div className="overflow-auto sm:overflow-auto md:overflow-visible lg:overflow-visible relative">
    <table
      className={`min-w-full divide-y  overflow-visible relative transition-all duration-300
      ${theme === 'dark' ? 'divide-gray-700 bg-[#1b2333]' : 'divide-gray-200 bg-white'}`}
    >
      <thead
        className={`${theme === 'dark' ? 'bg-[#2b3248]' : 'bg-gray-50'}`}
      >
        {/* Keep this empty if no header titles are needed */}
      </thead>

      <tbody
        className={`divide-y ${
          theme === 'dark' ? 'divide-gray-700 bg-[#1b2333]' : 'divide-gray-200 bg-white'
        }`}
      >
        {[
          { name: "Response Time", value: "120ms", trend: -5, status: "good" },
          { name: "Throughput", value: "1,250 req/s", trend: 12, status: "good" },
          { name: "Error Rate", value: "0.2%", trend: -0.1, status: "good" },
          { name: "CPU Usage", value: "45%", trend: 8, status: "warning" },
          { name: "Memory Usage", value: "68%", trend: 15, status: "warning" },
        ].map((metric, index) => (
          <tr
            key={index}
            className={`transition-colors ${
              theme === 'dark'
                ? 'hover:bg-[#2b3248] transform transition-transform duration-300 hover:scale-105'
                : 'hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105 '
            }`}
          >
       
            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  metric.status === "good"
                    ? "bg-[#463cd1]"
                    : metric.status === "warning"
                    ? "bg-[#9a47c1]"
                    : "bg-[#dc297a]"
                }`}
              />
              <span
                className={`font-medium ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                {metric.name}
              </span>
            </td>

            <td
              className={`px-6 py-4 whitespace-nowrap text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {metric.value}
            </td>

            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
              {metric.trend > 0 ? (
                <TrendingUp className="h-4 w-4 text-[#463cd1]" />
              ) : (
                <TrendingDown className="h-4 w-4 text-[#dc297a]" />
              )}
              <span
                className={`text-sm font-medium ${
                  metric.trend > 0 ? 'text-[#463cd1]' : 'text-[#dc297a]'
                }`}
              >
                {Math.abs(metric.trend)}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


  {/* Quick Stats Table */}
 <div data-aos="zoom-in-up"       
    data-aos-delay="200" 
  className={`p-4 rounded-2xl shadow-lg dark:shadow-2xl transition-colors duration-300 ${
    theme === 'dark' ? 'bg-[#20293b]' : 'bg-[#fffbff]'
  }`}
>
  <div className="mb-4">
    <h2
      className={`text-lg font-bold ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}
    >
      Quick Stats
    </h2>
    <p
      className={`text-sm ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
      }`}
    >
      At-a-glance metrics
    </p>
  </div>

  <div className="overflow-visible relative ">
    <table
      className={`min-w-full divide-y ${
        theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
      }`}
    >
      <tbody
        className={`divide-y ${
          theme === 'dark'
            ? 'bg-[#20293b] divide-gray-700'
            : 'bg-[#fffbff] divide-gray-200'
        }`}
      >
        {[
          { icon: "Users", label: "Active Users", value: "1,234", color: "text-[#463cd1]" },
          { icon: "Activity", label: "Sessions Today", value: "5,678", color: "text-[#dc297a]" },
          { icon: "Zap", label: "API Calls", value: "12,345", color: "text-yellow-500" },
          { icon: "Clock", label: "Avg. Session", value: "8m 32s", color: "text-purple-500" },
        ].map((stat, index) => (
          <tr
            key={index}
            className={`transition-colors ${
              theme === 'dark' ? 'hover:bg-[#2b3248] transform transition-transform duration-300 hover:scale-105' : 'hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105'
            }`}
          >
            <td
              className={`px-6 py-4 flex items-center gap-2 text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              {/* Replace with actual icons if you wish */}
              <span className={stat.color}>●</span>
              {stat.label}
            </td>
            <td
              className={`px-6 py-4 font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              {stat.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    </div>

    {/* chart */} 
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  {[<Barcard chartId="5" />, <Areacard chartId="4" />].map((CardComponent, index) => (
    <div
      key={index}
      data-aos="zoom-in-up"      
      data-aos-delay={index * 200} 
      className="transform transition-transform hover:scale-105"
    >
      {CardComponent}
    </div>
  ))}
</div>


        </div>
    
  );
};

export default AnalyticsPage;
