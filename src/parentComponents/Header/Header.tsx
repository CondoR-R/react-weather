import type React from "react";

import City from "../../components/City/City";
import CurrentTemperature from "../../components/CurrentTemperature/CurrentTemperature";

import style from "./Header.module.scss";
import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <div className={style.left}>
        <City />
        <CurrentTemperature />
      </div>
      <WeatherIcon />
    </div>
  );
};

export default Header;
