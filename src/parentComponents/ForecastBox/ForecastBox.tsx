import type React from "react";
import { useContext } from "react";

import { AppContext } from "../../App/AppContext";

import HourlyChart from "../../components/HourlyChart/HourlyChart";
import WeeklyForecast from "../../components/WeeklyForecast/WeeklyForecast";
import TommorowTemp from "../../components/TommorowTemp/TommorowTemp";

import style from "./ForecastBox.module.scss";
import TommorowTempSkeleton from "../../components/TommorowTemp/TommorowTempSkeleton";
import HourlyChartSkeleton from "../../components/HourlyChart/HourlyChartSkeleton";
import WeeklyForecastSkeleton from "../../components/WeeklyForecast/WeeklyForecastSkeleton";

const ForecastBox: React.FC = () => {
  const { isLoading } = useContext(AppContext);

  return (
    <div className={style.box}>
      {isLoading ? (
        <>
          <TommorowTempSkeleton className={style.tommorow} />
          <HourlyChartSkeleton className={style.chart} />
          <WeeklyForecastSkeleton className={style.weekly} />
        </>
      ) : (
        <>
          <TommorowTemp className={style.tommorow} />
          <HourlyChart className={style.chart} />
          <WeeklyForecast className={style.weekly} />
        </>
      )}
    </div>
  );
};

export default ForecastBox;
