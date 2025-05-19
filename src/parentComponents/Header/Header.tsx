import type React from "react";

import City from "../../components/City/City";
import CurrentTemperature from "../../components/CurrentTemperature/currentTemperature";

import style from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <div className={style.left}>
        <City />
        <CurrentTemperature />
      </div>
    </div>
  );
};

export default Header;
