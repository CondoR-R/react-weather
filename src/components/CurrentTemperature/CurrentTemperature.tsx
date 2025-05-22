import type React from "react";
import { useContext } from "react";
import { AppContext } from "../../App/AppContext";

import style from "./currentTemperature.module.scss";

const CurrentTemperature: React.FC = () => {
  const { current } = useContext(AppContext);

  let day: string = "";
  let date: string = "";

  if (typeof current?.date === "string") {
    const dateArr = new Date(current?.date).toString().split(" ");
    day = dateArr[0];
    date = `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`;
  }

  return (
    <div className={style.box}>
      <div className={style.left}>
        <p className={style.temperature}>{current?.temperature}°C</p>
        <p className={style.date}>
          {day} | {date}
        </p>
        <p className={style.cloudy}>{current?.name}</p>
      </div>
      <div className={style.right}>
        <div className={style.rightBox}>
          <span className={style.title}>Ощущается как:</span>
          <span className={style.value}>{current?.apparentTemperature}°C</span>
        </div>
        <div className={style.rightBox}>
          <span className={style.title}>Ветер: </span>
          <span className={style.value}>{current?.wind}км/ч</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentTemperature;
