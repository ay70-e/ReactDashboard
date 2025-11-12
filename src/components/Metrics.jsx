import React, { useContext, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { ThemeContext } from "../contexts/ThemeContext";
import { dashboardStats } from "../data/mockData";
import AOS from "aos";
import "aos/dist/aos.css";

const Metrics = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,   
    });
  }, []);

  const { theme } = useContext(ThemeContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardStats.slice(0, 4).map((stat, index) => (
      <div data-aos="zoom-in-down" data-aos-delay={index * 200}>
  <div
    className={`rounded-2xl shadow-lg dark:shadow-2xl p-6 
      transform transition-transform duration-300 hover:scale-105
      ${theme === "dark" ? "bg-[#20293b]" : "bg-[#fffbff]"}`}
  >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.trend && (
                <div className="flex items-center mt-1">
                  {stat.trend.isPositive ? (
                    <TrendingUp className="h-4 w-4 text-[#463cd1] mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#dc297a] mr-1" />
                  )}
                  <span
                    className={`text-sm ${
                      stat.trend.isPositive
                        ? "text-[#463cd1]"
                        : "text-[#dc297a]"
                    }`}
                  >
                    {stat.trend.value}%
                  </span>
                </div>
              )}
            </div>

            <div
              className={`p-3 rounded-full }`}
            >
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </div></div>
      ))}
    </div>
  );
};

export default Metrics;
