import type React from "react";

import style from "./WeeklyForecast.module.scss";
import weatherImages from "../../constants/weather";
import { useState } from "react";

interface WeeklyForecastProps {
  className?: string;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(2);

  const weeklyForecastArr = [
    { date: "SUN", weather: "cloudy" },
    { date: "MON", weather: "cloudy" },
    { date: "TUES", weather: "cloudy" },
    { date: "WED", weather: "cloudy" },
    { date: "THUR", weather: "cloudy" },
    { date: "FRI", weather: "cloudy" },
    { date: "SAT", weather: "cloudy" },
  ];

  const onClickLeftArr = () => {
    setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const onClickRightArr = () => {
    setActiveIndex((prev) =>
      prev === weeklyForecastArr.length - 1
        ? weeklyForecastArr.length - 1
        : prev + 1
    );
  };

  return (
    <div className={`${style.box} ${className}`}>
      <div className={style.weekBox}>
        <button
          onClick={onClickLeftArr}
          className={`${style.btn} ${style.left}`}
        >
          <svg
            width="12"
            height="23"
            viewBox="0 0 12 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9463 1.77178L1.20138 11.5167L10.9463 21.2616"
              stroke="white"
              strokeWidth="1.7718"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={style.weekOuter}>
          <div
            className={style.weekInner}
            style={{
              transform: `translateX(${60 * (2 - activeIndex) - 15}px)`,
            }}
          >
            {weeklyForecastArr.map(({ date, weather }, i) => (
              <div
                key={i}
                className={`${style.weatherBox} ${
                  activeIndex + 1 === i || activeIndex - 1 === i
                    ? style.prev
                    : ""
                } ${
                  (activeIndex + 1 > i || activeIndex - 1 < i) &&
                  i !== activeIndex
                    ? style.notActive
                    : ""
                }`}
              >
                <span>{date}</span>
                <img
                  src={weatherImages[weather]}
                  alt={weather}
                  width={45}
                  height={30}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onClickRightArr}
          className={`${style.btn} ${style.right}`}
        >
          <svg
            width="11"
            height="21"
            viewBox="0 0 11 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 20L10 10.5L1 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WeeklyForecast;
