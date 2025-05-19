import type React from "react";

interface WeeklyForecastProps {
  className?: string;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ className }) => {
  return <div className={`${className}`}>WeeklyForecast</div>;
};

export default WeeklyForecast;
