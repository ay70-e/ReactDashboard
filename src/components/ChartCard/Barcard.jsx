import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ThemeContext } from "../../contexts/ThemeContext";
import { chartData as mockChartData } from "../../data/mockData";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

export default function Barcard({ chartId = "2" }) {
  const { theme } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  // Find the chart from mockData by ID
  const chartInfo = mockChartData.find(chart => chart.id === chartId);

  useEffect(() => {
    if (!chartInfo) return;

    setChartData({
      labels: chartInfo.data.map(item => item.name),
datasets: [
  {
    label: chartInfo.title,
    data: chartInfo.data.map(item => item.value),
    fill: true,
    backgroundColor: function(context) {
      const chart = context.chart;
      const { ctx, chartArea } = chart;
      if (!chartArea) return null;

      const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
      if (theme === 'dark') {
        gradient.addColorStop(0, '#6A0DAD');
        gradient.addColorStop(0.3, '#5E72E4');
        gradient.addColorStop(0.6, '#FF0077');
        gradient.addColorStop(1, '#4A00B7');
      } else {
        gradient.addColorStop(0, '#4338CA');
        gradient.addColorStop(0.3, '#4F46E5');
        gradient.addColorStop(0.6, '#EC4899');
        gradient.addColorStop(1, '#DB2777');
      }
      return gradient;
    },
    borderWidth: 0, 
  }
],
    });
  }, [theme, chartInfo]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(20, 30, 48, 0.9)' : 'rgba(255,255,255,0.95)',
        titleColor: theme === 'dark' ? '#B3C2E1' : '#111827',
        bodyColor: theme === 'dark' ? '#8898AA' : '#6B7280',
        borderColor: theme === 'dark' ? '#5E72E4' : '#4F46E5',
        borderWidth: 1,
        cornerRadius: 6,
        padding: 10,
             
      },

    },
    scales: {
      y: { beginAtZero: true },
      x: { beginAtZero: true  },
    },
    
  }), [theme]);

  const handleRefresh = () => {
    // regenerate chart data
    if (chartInfo) {
      setChartData(prev => ({
        ...prev,
        datasets: prev.datasets.map(ds => ({
          ...ds,
          data: chartInfo.data.map(item => item.value)
        }))
      }));
    }
  };

  const handleDownload = () => {
    if (chartRef.current) {
      const link = document.createElement('a');
      link.download = `${chartInfo?.title || 'chart'}.png`;
      link.href = chartRef.current.toBase64Image();
      link.click();
    }
  };

  return (
  <div
    className={`w-full max-w-[500px] h-full max-h-[400px] backdrop-blur-sm p-6 rounded-2xl overflow-hidden ${
      theme === 'dark' ? 'shadow-2xl' : 'shadow-lg'
    }`}
    style={{
      backgroundColor:
        theme === 'dark'
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.8)',
    }}
  >
    {/* Title + Buttons row */}
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2
          className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          {chartInfo?.title}
        </h2>
        <p
          className={`text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {chartInfo?.description}
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleRefresh}
          style={{
            boxShadow:
              theme === 'dark'
                ? 'inset 0 2px 4px rgba(0,0,0,0.6)'
                : 'inset 0 2px 6px rgba(0,0,0,0.08)',
          }}
           className={` rounded-md flex items-center space-x-2  w-8 h-8 p-1   justify-center
            ${theme === 'dark' ? 'bg-rgba(255, 255, 255, 0.8) ' : 'bg-rgba(255, 255, 255, 0.05) '}`}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/12797/12797892.png"
            alt="refresh"
           className="w-full h-full object-contain"
          />
        </button>

        <button
          onClick={handleDownload}
          style={{
            boxShadow:
              theme === 'dark'
                ? 'inset 0 2px 4px rgba(0,0,0,0.6)'
                : 'inset 0 2px 6px rgba(0,0,0,0.08)',
          }}
           className={` rounded-md flex items-center space-x-2  w-8 h-8 p-1  justify-center
            ${theme === 'dark' ? 'bg-rgba(255, 255, 255, 0.8) ' : 'bg-rgba(255, 255, 255, 0.05) '}`}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/15604/15604130.png"
            alt="download icon"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>

    {/* Responsive Chart Wrapper */}
    <div className="relative w-full h-[80%] overflow-hidden">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  </div>
);

}
