import type React from "react";
import { useContext } from "react";
import { AppContext } from "../../App/AppContext";

import style from "./ErrorMessage.module.scss";

const ErrorMessage: React.FC = () => {
  const { error } = useContext(AppContext);
  return <div className={style.error}>{error}</div>;
};

export default ErrorMessage;
