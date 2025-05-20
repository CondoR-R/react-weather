import type React from "react";

import style from "./ForecastBox.module.scss";
import HourlyChart from "../../components/HourlyChart/HourlyChart";
import WeeklyForecast from "../../components/WeeklyForecast/WeeklyForecast";
import TommorowTemp from "../../components/TommorowTemp/TommorowTemp";

const ForecastBox: React.FC = () => {
  return (
    <div className={style.box}>
      <TommorowTemp className={style.tommorow} />
      <HourlyChart className={style.chart} />
      <WeeklyForecast className={style.weekly} />
    </div>
  );
};

export default ForecastBox;
