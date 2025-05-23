import type React from "react";
import { useContext } from "react";
import { AppContext } from "../../App/AppContext";

import weatherImages from "../../constants/weather";

import style from "./WeatherIcon.module.scss";
import WeatherIconSkeleton from "./WeatherIconSkeleton";

const WeatherIcon: React.FC = () => {
  const { current, isLoading } = useContext(AppContext);

  if (!current?.weather) return;

  return (
    <div className={style.weather}>
      {isLoading ? (
        <WeatherIconSkeleton />
      ) : (
        <img
          src={weatherImages[current?.weather]}
          className={style.weather}
          alt={"cloudy"}
          width={320}
          height={300}
        />
      )}
    </div>
  );
};

export default WeatherIcon;
