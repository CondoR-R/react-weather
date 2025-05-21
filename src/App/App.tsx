import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { AppContext } from "./AppContext";

import getHourly from "../functions/getHourly";

import CurrentBox from "../parentComponents/CurrentBox/CurrentBox";
import ForecastBox from "../parentComponents/ForecastBox/ForecastBox";
import getCurrent from "../functions/getCurrent";

type Coords = {
  latitude: null | number;
  longitude: null | number;
};

export type Hourly = ({
  time: string;
  temp: number;
  weather: string;
  wind: string;
} | null)[];

export type Current = {
  temperature: number;
  date: string;
  weather: string;
  apparentTemperature: number;
  wind: string;
} | null;

const App: React.FC = () => {
  const [coords, setCoords] = useState<Coords>({
    latitude: null,
    longitude: null,
  });
  const [hourly, setHourly] = useState<Hourly>([]);
  const [current, setCurrent] = useState<Current>(null);

  // получение координат пользователя
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
      });
    }
  }, []);

  // получение данных о погоде
  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      try {
        (async () => {
          const url = "https://api.open-meteo.com/v1/forecast";
          const coord = `latitude=${coords.latitude}&longitude=${coords.longitude}`;

          const hourlyParams = `hourly=temperature_2m,wind_speed_10m,rain,showers,snowfall,cloud_cover`;
          const currentParams = `current=temperature_2m,apparent_temperature,wind_speed_10m,is_day,cloud_cover,showers,rain,snowfall`;
          const dailyParams = `daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,sunset,sunrise`;

          const params = `${coord}&${dailyParams}&${currentParams}&${hourlyParams}&timezone=auto&forecast_hours=24`;

          const { data } = await axios.get(`${url}?${params}`);

          const {
            hourly: hourlyData,
            daily: dailyData,
            current: currentData,
          } = data;

          console.log(currentData);

          setHourly(getHourly(hourlyData));
          setCurrent(getCurrent(currentData));
        })();
      } catch {
        console.log("error");
      }
    }
  }, [coords]);

  const contextValue = {
    hourly,
    current,
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
