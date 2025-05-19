import type React from "react";

import style from "./WeatherIcon.module.scss";
import weatherImages from "../../constants/weather";

const WeatherIcon: React.FC = () => {
  return (
    <div className={style.weather}>
      <img
        src={weatherImages["cloudy"]}
        className={style.weather}
        alt={"cloudy"}
        width={320}
        height={320}
      />
    </div>
  );
};

export default WeatherIcon;
