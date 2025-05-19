import type React from "react";

import style from "./currentTemperature.module.scss";

const CurrentTemperature: React.FC = () => {
  return (
    <div className={style.box}>
      <p className={style.temperature}>26°C</p>
      <p className={style.date}>Sunday | 12 May 2025</p>
      <p className={style.cloudy}>Cloudy</p>
    </div>
  );
};

export default CurrentTemperature;
