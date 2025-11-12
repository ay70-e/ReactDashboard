import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,      
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { ThemeContext } from "../../contexts/ThemeContext";
import { chartData as mockChartData } from "../../data/mockData";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export default function DonutCard({ chartId = "2" }) {
  const { theme } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  const chartInfo = mockChartData.find(chart => chart.id === chartId);

  useEffect(() => {
    if (!chartInfo) return;

    const ctx = chartRef.current?.ctx;
    if (!ctx) return;

    // Create gradients for each slice
      const colors = chartInfo.data.map(() => {
      const gradient = ctx.createLinearGradient(0, 0, 300, 0);
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
    });

    setChartData({
      labels: chartInfo.data.map(item => item.name),
      datasets: [
        {
          label: chartInfo.title,
          data: chartInfo.data.map(item => item.value),
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 2,
          cutout: '50%', // Makes it a donut chart
        }
      ],
    });
  }, [theme, chartInfo]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(20,30,48,0.9)' : 'rgba(255,255,255,0.95)',
        titleColor: theme === 'dark' ? '#B3C2E1' : '#111827',
        bodyColor: theme === 'dark' ? '#8898AA' : '#6B7280',
        borderColor: theme === 'dark' ? '#5E72E4' : '#4F46E5',
        borderWidth: 1,
        cornerRadius: 6,
        padding: 10,
      },
      datalabels: {
        color: (context) => {
    return context.dataset.backgroundColor[context.dataIndex]; },
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data.reduce((sum, val) => sum + val, 0);
          return ((value / total) * 100).toFixed(1) + '%';
        },
        anchor: 'end',
        align: 'end',
        offset: 10,
        font: { weight: 'bold', size: 10 },
      },
    },
  }), [theme]);

  const handleRefresh = () => {
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
    <div className={`w-full max-w-[500px] h-full max-h-[400px] backdrop-blur-sm p-6 rounded-2xl ${theme === 'dark' ? 'shadow-2xl' : 'shadow-lg'}`}
      style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)' }}>
      
      {/* Title + Buttons row */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {chartInfo?.title}
          </h2>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {chartInfo?.description}
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            style={{
              boxShadow: theme === 'dark' 
                ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
                : 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
            className={`px-3 py-1 rounded-md flex items-center space-x-2`}
          >
            <img src="https://cdn-icons-png.flaticon.com/128/12797/12797892.png" alt="refresh" className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownload}
            style={{
              boxShadow: theme === 'dark' 
                ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
                : 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
            className={`px-3 py-1 rounded-md flex items-center space-x-2`}
          >
            <img src="https://cdn-icons-png.flaticon.com/128/15604/15604130.png" alt="download" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Donut Chart */}
      <div style={{ height: '120px' }}>
        <Doughnut ref={chartRef} data={chartData} options={options} />
      </div>

     
    </div>
  );
}
