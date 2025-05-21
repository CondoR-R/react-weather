import type React from "react";
import { useContext } from "react";

import { AppContext } from "../../App/AppContext";

import style from "./TommorowTemp.module.scss";

interface TommorowTempProps {
  className?: string;
}

const TommorowTemp: React.FC<TommorowTempProps> = ({ className }) => {
  const { tommorow } = useContext(AppContext);

  return (
    <div className={`${style.tommorowBox} ${className}`}>
      <span>
        Tommorow it will get {tommorow?.text} by {tommorow?.value}°C
      </span>
      {/* <svg
        className={style.green}
        width="11"
        height="21"
        viewBox="0 0 11 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 20L10 10.5L1 1"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg> */}
    </div>
  );
};

export default TommorowTemp;
