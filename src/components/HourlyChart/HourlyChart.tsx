import type React from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useContext } from "react";

import { AppContext } from "../../App/AppContext";

import weatherImages from "../../constants/weather";

import style from "./HourlyChart.module.scss";

interface ForecastBoxProps {
  className?: string;
}

const HourlyChart: React.FC<ForecastBoxProps> = ({ className }) => {
  const { hourly } = useContext(AppContext);

  return (
    <div className={`${style.chartBox} ${className}`}>
      <h2 className={style.title}>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.18836 0.0235596C3.66501 0.0235596 -0.00012207 3.68869 -0.00012207 8.21204C-0.00012207 12.7354 3.66501 16.4005 8.18836 16.4005C12.7117 16.4005 16.3768 12.7354 16.3768 8.21204C16.3768 3.68869 12.7117 0.0235596 8.18836 0.0235596ZM8.85761 8.88129H4.40906V8.21204H8.18836V3.17298H8.85761V8.88129Z"
            fill="white"
          />
        </svg>
        <span>24-hour temperature</span>
      </h2>
      <div className={style.chartWrapper}>
        <ResponsiveContainer
          width="108%"
          height={160}
          style={{ transform: "translateX(-65px)" }}
        >
          <LineChart data={hourly} margin={{ left: 10, right: 20, top: 20 }}>
            <XAxis dataKey="time" stroke="#fff" tick={{ fontSize: 14 }} />
            <YAxis style={{ display: "none", visibility: "hidden" }} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#fff"
              strokeWidth={1}
              dot={{ r: 2 }}
              label={{ fill: "#fff", fontSize: 14 }}
              style={{ transform: "translateY(15px)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={style.bottomRow}>
        {hourly &&
          hourly.map((hourlyWeather, i) => {
            if (!hourlyWeather) return;

            return (
              <div key={i} className={style.infoBox}>
                <img
                  src={weatherImages[hourlyWeather.weather]}
                  className={style.weather}
                  alt={hourlyWeather.weather}
                  width={30}
                  height={25}
                />
                <span className={style.wind}>{hourlyWeather.wind}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HourlyChart;
