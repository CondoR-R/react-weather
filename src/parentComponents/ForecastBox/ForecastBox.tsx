import type React from "react";

import style from "./ForecastBox.module.scss";
import HourlyChart from "../../components/HourlyChart/HourlyChart";

const ForecastBox: React.FC = () => {
  return (
    <div className={style.box}>
      <HourlyChart className={style.chart} />
    </div>
  );
};

export default ForecastBox;
