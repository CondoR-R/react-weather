// импорт библиотек
import type React from "react";
import { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "../../App/AppContext";

// импорт стилей
import style from "./City.module.scss";

const City: React.FC = () => {
  const { city, setSearchValue } = useContext(AppContext);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickShowInput = () => {
    setIsShow((prev) => !prev);
    setInputValue("");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (isShow && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShow]);

  return (
    <div className={style.cityBox}>
      <svg
        className={style.location}
        width="18"
        height="25"
        viewBox="0 0 18 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 0C4.03071 0 0 3.91875 0 8.75C0 15.3125 9 25 9 25C9 25 18 15.3125 18 8.75C18 3.91875 13.9693 0 9 0ZM9 11.875C7.22571 11.875 5.78571 10.475 5.78571 8.75C5.78571 7.025 7.22571 5.625 9 5.625C10.7743 5.625 12.2143 7.025 12.2143 8.75C12.2143 10.475 10.7743 11.875 9 11.875Z"
          fill="white"
        />
      </svg>
      <span>{city}</span>
      <button
        style={{ rotate: isShow ? "180deg" : "0deg" }}
        onClick={onClickShowInput}
        className={style.showInput}
      >
        <svg
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
        </svg>
      </button>
      <div
        style={{
          transform: isShow ? "translateX(0)" : "translateX(-5rem)",
          opacity: isShow ? 1 : 0,
          visibility: isShow ? "visible" : "hidden",
        }}
        className={style.searchBox}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={onChangeInput}
        />
      </div>
    </div>
  );
};

export default City;
