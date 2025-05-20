import type React from "react";

import style from "./WeeklyForecast.module.scss";
import { useState } from "react";
import WeeklySlider from "../WeeklySlider/WeeklySlider";
import ForecastInfo from "../ForecastInfo/ForecastInfo";

interface WeeklyForecastProps {
  className?: string;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState<number>(2);

  const weeklyForecastArr = [
    {
      date: "SUN",
      weather: "cloudy",
      minTemp: 10,
      maxTemp: 15,
      wind: 5,
      chance: 2,
      sunrise: "06:00",
      sunset: "21:00",
    },
    {
      date: "MON",
      weather: "cloudy",
      minTemp: 12,
      maxTemp: 18,
      wind: 2,
      chance: 5,
      sunrise: "06:00",
      sunset: "21:00",
    },
    {
      date: "TUES",
      weather: "cloudy",
      minTemp: 15,
      maxTemp: 25,
      wind: 0,
      chance: 0,
      sunrise: "06:00",
      sunset: "21:00",
    },
    {
      date: "WED",
      weather: "cloudy",
      minTemp: 20,
      maxTemp: 27,
      wind: 3,
      chance: 4,
      sunrise: "06:00",
      sunset: "21:00",
    },
    {
      date: "THUR",
      weather: "cloudy",
      minTemp: 10,
      maxTemp: 15,
      wind: 7,
      chance: 90,
      sunrise: "06:00",
      sunset: "21:00",
    },
    {
      date: "FRI",
      weather: "cloudy",
      minTemp: 8,
      maxTemp: 6,
      wind: 5,
      chance: 2,
      sunrise: "06:00",
      sunset: "21:00",
    },
    {
      date: "SAT",
      weather: "cloudy",
      minTemp: 2,
      maxTemp: 40,
      wind: 5,
      chance: 2,
      sunrise: "06:00",
      sunset: "21:00",
    },
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
      <WeeklySlider
        onClickLeftArr={onClickLeftArr}
        onClickRightArr={onClickRightArr}
        weeklyForecastArr={weeklyForecastArr}
        activeIndex={activeIndex}
      />
      <ForecastInfo weeklyForecast={weeklyForecastArr[activeIndex]} />
    </div>
  );
};

export default WeeklyForecast;
