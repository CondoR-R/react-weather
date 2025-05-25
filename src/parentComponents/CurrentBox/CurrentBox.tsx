import type React from "react";
import { useContext } from "react";

import { AppContext } from "../../App/AppContext";

import City from "../../components/City/City";
import CurrentTemperature from "../../components/CurrentTemperature/CurrentTemperature";
import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";

import style from "./CurrentBox.module.scss";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Header: React.FC = () => {
  const { error } = useContext(AppContext);
  return (
    <div className={style.header}>
      <div className={style.top}>
        <City />
        {error && <ErrorMessage />}
      </div>
      <div className={style.forecast}>
        <div className={style.left}>
          <CurrentTemperature />
        </div>
        <WeatherIcon />
      </div>
    </div>
  );
};

export default Header;
