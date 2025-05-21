import type React from "react";
import { useContext, useState } from "react";

import { AppContext } from "../../App/AppContext";

import WeeklySlider from "../WeeklySlider/WeeklySlider";
import ForecastInfo from "../ForecastInfo/ForecastInfo";

import style from "./WeeklyForecast.module.scss";

interface WeeklyForecastProps {
  className?: string;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ className }) => {
  const { daily } = useContext(AppContext);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onClickLeftArr = () => {
    setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const onClickRightArr = () => {
    if (daily) {
      setActiveIndex((prev) =>
        prev === daily.length - 1 ? daily.length - 1 : prev + 1
      );
    }
  };

  if (!daily) return;

  return (
    <div className={`${style.box} ${className}`}>
      <WeeklySlider
        onClickLeftArr={onClickLeftArr}
        onClickRightArr={onClickRightArr}
        weeklyForecastArr={daily}
        activeIndex={activeIndex}
      />
      <ForecastInfo weeklyForecast={daily[activeIndex]} />
    </div>
  );
};

export default WeeklyForecast;
