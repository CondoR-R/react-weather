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

  const [isLoadingForecast, setIsloadingForecast] = useState<boolean>(true);
  const [isLoadingCity, setIsloadingCity] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
    text: "холоднее",
    value: 0,
  });

  // запись в состояние города для поиска
  const setSearchValue = useMemo(
    () =>
      debounce((searchValue: string) => {
        setSearchCity(searchValue);
      }, 750),
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
    if ((!coords.latitude && !coords.longitude) || city) return;

    (async () => {
      setIsloadingCity(true);
      try {
        // const url = "https://geocode-maps.yandex.ru/v1";
        // const apikey = `apikey=${APIKey}`;
        // const geocode = `geocode=${coords.longitude}%3B${coords.latitude}`;
        // const lang = "lang=ru_RU";
        // const sco = "sco=longlat";
        // const kind = "kind=locality";
        // const format = "format=json";
        // const results = "results=1";

        // const res = await axios.get(
        //   `${url}?${apikey}&${geocode}&${lang}&${sco}&${kind}&${format}&${results}`
        // );

        const url = "https://geocode.maps.co/reverse";
        const coord = `lat=${coords.latitude}&lon=${coords.longitude}`;
        const apikey = `api_key=${APIKey}`;

        const res = await axios.get(`${url}?${coord}&${apikey}`);

        if (res.status === 404) {
          throw new Error(
            "Данные о населенном пункте не найдены для указанных координат"
          );
        }

        if (res.status !== 200) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }

        // const newCity =
        //   res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
        let newCity = res.data.address.city;

        if (!newCity) {
          newCity = res.data.address.town;
        }
        setCity(newCity);

        // убираем загрузку только при успешном получении данных
        setIsloadingCity(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Обработка ошибок Axios
          if (err.response) {
            // Сервер ответил с кодом ошибки
            setError(
              `Ошибка ответа при получении данных о населенном пункте: ${err.response.status}`
            );
            if (err.response.status === 404) {
              // Специальная обработка для 404
              setError(
                "Данные о населенном пункте не найдены. Проверьте координаты."
              );
            }
          } else if (err.request) {
            // Запрос был сделан, но ответ не получен
            setError(
              "Нет ответа от сервера при получении данных о населенном пункте"
            );
          } else {
            // Ошибка при настройке запроса
            setError(
              `Ошибка запроса при получении данных о населенном пункте: ${err.message}`
            );
          }
        } else {
          // Другие ошибки
          setError(
            `Неожиданная ошибка при получении данных о населенном пункте: ${err}`
          );
        }
      }
    })();
  }, [coords]);

  // получение координат по городу
  useEffect(() => {
    if (!searchCity) return;

    (async () => {
      setIsloadingCity(true);
      try {
        // const url = "https://geocode-maps.yandex.ru/v1";
        // const apikey = `apikey=${APIKey}`;
        // const geocode = `geocode=${searchCity}`;
        // const lang = "lang=ru_RU";
        // const format = "format=json";
        // const results = "results=1";

        // const res = await axios.get(
        //   `${url}?${apikey}&${geocode}&${lang}&${format}&${results}`
        // );

        const url = "https://geocode.maps.co/search";
        const address = `q=${searchCity}`;
        const apikey = `api_key=${APIKey}`;

        const res = await axios.get(`${url}?${address}&${apikey}`);

        if (res.status === 404) {
          throw new Error("Координаты города не найдены");
        }

        if (res.status !== 200) {
          throw new Error(
            `Ошибка сервера при получении данных о координатах населенного пункта: ${res.status}`
          );
        }

        for (const data of res.data) {
          if (
            data.type === "city" ||
            data.type === "town" ||
            data.type === "village"
          ) {
            const { lat, lon } = data;

            setCoords({ longitude: +lon, latitude: +lat });
            setCity(data.display_name.split(",")[0]);
          }
        }

        // const coord =
        //   res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
        //     " "
        //   );

        // setCoords({ longitude: +coord[0], latitude: +coord[1] });

        // убираем загрузку только при успешном получении данных
        setIsloadingCity(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Обработка ошибок Axios
          if (err.response) {
            // Сервер ответил с кодом ошибки
            setError(
              `Ошибка ответа при получении данных о координатах населенного пункта: ${err.response.status}`
            );
            if (err.response.status === 404) {
              // Специальная обработка для 404
              setError("Координаты населенного пункта не найдены. ");
            }
          } else if (err.request) {
            // Запрос был сделан, но ответ не получен
            setError(
              "Нет ответа от сервера при получении данных о координатах населенного пункта"
            );
          } else {
            // Ошибка при настройке запроса
            setError(
              `Ошибка запроса при получении данных о координатах населенного пункта: ${err.message}`
            );
          }
        } else {
          // Другие ошибки
          setError(
            `Неожиданная ошибка при получении данных о координатах населенного пункта: ${err}`
          );
        }
      }
    })();
  }, [searchCity]);

  // получение данных о погоде
  useEffect(() => {
    if (!coords.latitude && !coords.longitude) return;

    (async () => {
      setIsloadingForecast(true);
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
          throw new Error(
            `Ошибка сервера при получении данных о погоде: ${res.status}`
          );
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

        // убираем загрузку только при успешном получении данных
        setIsloadingForecast(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Обработка ошибок Axios
          if (err.response) {
            // Сервер ответил с кодом ошибки
            setError(
              `Ошибка ответа при получении данных о погоде:${err.response.status}`
            );
            if (err.response.status === 404) {
              // Специальная обработка для 404
              setError("Данные о погоде не найдены. Проверьте координаты.");
            }
          } else if (err.request) {
            // Запрос был сделан, но ответ не получен
            setError("Нет ответа от сервера при получении данных о погоде");
          } else {
            // Ошибка при настройке запроса
            setError(
              `Ошибка запроса при получении данных о погоде: ${err.message}`
            );
          }
        } else {
          // Другие ошибки
          setError(`Неожиданная ошибка при получении данных о погоде: ${err}`);
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
    isLoadingForecast,
    isLoadingCity,
    error,
    setSearchValue,
  };

  let appClass = current?.isDay ? "sunny" : "night";
  if (current?.weather === "rain") appClass = "rain";
  else if (
    current?.weather === "cloudy" ||
    current?.weather === "partlyCloudy" ||
    current?.weather === "partlyMoon"
  ) {
    appClass = current.isDay ? "cloudy" : "night-cloudy";
  }

  return (
    <AppContext value={contextValue}>
      <div className={`app ${appClass}`}>
        <div className="app-inside">
          <CurrentBox />
          <ForecastBox />
        </div>
      </div>
    </AppContext>
  );
};

export default App;
