import type React from "react";

import style from "./currentTemperature.module.scss";

const CurrentTemperature: React.FC = () => {
  return (
    <div className={style.box}>
      <div className={style.left}>
        <p className={style.temperature}>26°C</p>
        <p className={style.date}>Sunday | 12 May 2025</p>
        <p className={style.cloudy}>Cloudy</p>
      </div>
      <div className={style.right}>
        <div className={style.rightBox}>
          <span className={style.title}>Feels like</span>
          <span className={style.value}>20°C</span>
        </div>
        <div className={style.rightBox}>
          <span className={style.title}>Wind</span>
          <span className={style.value}>5km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentTemperature;
