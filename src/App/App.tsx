// импорт библиотек
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

// испорт контекста
import { AppContext } from "./AppContext";

// импорт функций
import { getHourly } from "../functions/getHourly";
import { getCurrent } from "../functions/getCurrent";
import { getDaily } from "../functions/getDaily";
import { getTommorow } from "../functions/getTommorow";
import { debounce } from "../functions/debounce";

// импорт компонентов
import CurrentBox from "../parentComponents/CurrentBox/CurrentBox";
import ForecastBox from "../parentComponents/ForecastBox/ForecastBox";

// импорт типов
import type { Coords } from "../types/Coords";
import type { Hourly } from "../types/Hourly";
import type { Current } from "../types/Current";
import type { Daily } from "../types/Daily";
import type { Tommorow } from "../types/Tommorow";

import { APIKey } from "./ApiKey";

const App: React.FC = () => {
  // состояния

  // координаты
  const [coords, setCoords] = useState<Coords>({
    latitude: null,
    longitude: null,
  });

  // город из инпута
  const [searchCity, setSearchCity] = useState<string>("");

  // город
  const [city, setCity] = useState<string>("");

  // данные для почасового прогноза
  const [hourly, setHourly] = useState<Hourly>([]);

  // данные для текущей погоды
  const [current, setCurrent] = useState<Current>(null);

  // данные для недельного прогноза
  const [daily, setDaily] = useState<Daily[]>([]);

  // данные о завтрашней температуре
  const [tommorow, setTommorow] = useState<Tommorow>({
    text: "colder",
    value: 0,
  });

  const setSearchValue = useMemo(
    () =>
      debounce((searchValue: string) => {
        setSearchCity(searchValue);
      }, 500),
    [setSearchCity]
  );

  // получение координат пользователя
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
      });
    }
  }, []);

  // получение данных о городе
  useEffect(() => {
    if (!coords.latitude && !coords.longitude) return;

    (async () => {
      try {
        const url = "https://geocode-maps.yandex.ru/v1";
        const apikey = `apikey=${APIKey}`;
        const geocode = `geocode=${coords.longitude}%3B${coords.latitude}`;
        const lang = "lang=ru_RU";
        const sco = "sco=longlat";
        const kind = "kind=locality";
        const format = "format=json";
        const results = "results=1";

        const res = await axios.get(
          `${url}?${apikey}&${geocode}&${lang}&${sco}&${kind}&${format}&${results}`
        );

        if (res.status === 404) {
          throw new Error(
            "Данные о населенном пункте не найдены для указанных координат"
          );
        }

        if (res.status !== 200) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }

        const newCity =
          res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
        setCity(newCity);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Обработка ошибок Axios
          if (err.response) {
            // Сервер ответил с кодом ошибки
            console.log("Ошибка ответа:", err.response.status);
            if (err.response.status === 404) {
              // Специальная обработка для 404
              console.log(
                "Данные о населенном пункте не найдены. Проверьте координаты."
              );
            }
          } else if (err.request) {
            // Запрос был сделан, но ответ не получен
            console.log("Нет ответа от сервера");
          } else {
            // Ошибка при настройке запроса
            console.log("Ошибка запроса:", err.message);
          }
        } else {
          // Другие ошибки
          console.log("Неожиданная ошибка:", err);
        }
      }
    })();
  }, [coords]);

  // получение данных о погоде
  useEffect(() => {
    if (!coords.latitude && !coords.longitude) return;

    (async () => {
      try {
        const url = "https://api.open-meteo.com/v1/forecast";
        const coord = `latitude=${coords.latitude}&longitude=${coords.longitude}`;
        const hourlyParams = `hourly=temperature_2m,wind_speed_10m,rain,showers,snowfall,cloud_cover,is_day`;
        const currentParams = `current=temperature_2m,apparent_temperature,wind_speed_10m,is_day,cloud_cover,showers,rain,snowfall`;
        const dailyParams = `&daily=sunrise,sunset,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,cloud_cover_mean`;

        const params = `${coord}&${dailyParams}&${currentParams}&${hourlyParams}&timezone=auto&forecast_hours=24`;

        const res = await axios.get(`${url}?${params}`);

        if (res.status === 404) {
          throw new Error("Данные о погоде не найдены для указанных координат");
        }

        if (res.status !== 200) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }

        const {
          hourly: hourlyData,
          daily: dailyData,
          current: currentData,
        } = res.data;

        setTommorow(getTommorow(dailyData));
        setDaily(getDaily(dailyData));
        setHourly(getHourly(hourlyData));
        setCurrent(getCurrent(currentData));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Обработка ошибок Axios
          if (err.response) {
            // Сервер ответил с кодом ошибки
            console.log("Ошибка ответа:", err.response.status);
            if (err.response.status === 404) {
              // Специальная обработка для 404
              console.log("Данные о погоде не найдены. Проверьте координаты.");
            }
          } else if (err.request) {
            // Запрос был сделан, но ответ не получен
            console.log("Нет ответа от сервера");
          } else {
            // Ошибка при настройке запроса
            console.log("Ошибка запроса:", err.message);
          }
        } else {
          // Другие ошибки
          console.log("Неожиданная ошибка:", err);
        }
      }
    })();
  }, [coords]);

  // значения контекста
  const contextValue = {
    hourly,
    current,
    daily,
    tommorow,
    city,
    setSearchValue,
  };

  return (
    <AppContext value={contextValue}>
      <div className="app">
        <CurrentBox />
        <ForecastBox />
      </div>
    </AppContext>
  );
};

export default App;
