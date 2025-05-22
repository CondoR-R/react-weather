import type { Current } from "../types/Current";

export function getCurrent(currentData: {
  apparent_temperature: number;
  temperature_2m: number;
  wind_speed_10m: number;
  cloud_cover: number;
  is_day: number;
  rain: number;
  showers: number;
  snowfall: number;
  time: string;
}): Current {
  const current = {
    apparentTemperature: Math.round(currentData.apparent_temperature),
    temperature: Math.round(currentData.temperature_2m),
    wind: `${Math.round(currentData.wind_speed_10m)}`,
    weather: currentData.is_day ? "sunny" : "moon",
    date: currentData.time,
    name: "Ясно",
  };

  if (currentData.cloud_cover > 50) {
    current.weather = "cloudy";
    current.name = "Облачно";
  } else if (currentData.cloud_cover !== 0) {
    current.weather = currentData.is_day ? "partlyCloudy" : "partlyMoon";
    current.name = "Переменная облачность";
  } else if (currentData.rain || currentData.showers) {
    current.weather = "rain";
    current.name = "Дождь";
  } else if (currentData.snowfall) {
    current.weather = "snow";
    current.name = "Снег";
  }

  return current;
}
