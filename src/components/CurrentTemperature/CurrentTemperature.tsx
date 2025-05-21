import type React from "react";
import { useContext } from "react";
import { AppContext } from "../../App/AppContext";

import style from "./currentTemperature.module.scss";

const CurrentTemperature: React.FC = () => {
  const { current } = useContext(AppContext);

  return (
    <div className={style.box}>
      <div className={style.left}>
        <p className={style.temperature}>{current?.temperature}°C</p>
        <p className={style.date}>Sunday | 12 May 2025</p>
        <p className={style.cloudy}>
          {`${current?.weather[0].toLocaleUpperCase()}${current?.weather.slice(
            1
          )}`}
        </p>
      </div>
      <div className={style.right}>
        <div className={style.rightBox}>
          <span className={style.title}>Feels like</span>
          <span className={style.value}>{current?.apparentTemperature}°C</span>
        </div>
        <div className={style.rightBox}>
          <span className={style.title}>Wind</span>
          <span className={style.value}>{current?.wind}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentTemperature;
