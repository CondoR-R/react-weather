import type { Current } from "../types/Current";

export function getCurrent(currentData: {
  apparent_temperature: number;
  temperature_2m: number;
  wind_speed_10m: number;
  cloud_cover: number;
  //   is_day: 1;
  rain: number;
  showers: number;
  snowfall: number;
  time: string;
}): Current {
  const current = {
    apparentTemperature: Math.round(currentData.apparent_temperature),
    temperature: Math.round(currentData.temperature_2m),
    wind: `${Math.round(currentData.wind_speed_10m)}km/h`,
    weather: "sunny",
    date: currentData.time,
    name: "Sunny",
  };

  if (currentData.cloud_cover > 50) {
    current.weather = "cloudy";
    current.name = "Cloudy";
  } else if (currentData.cloud_cover !== 0) {
    current.weather = "partlyCloudy";
    current.name = "Partly cloudy";
  } else if (currentData.rain || currentData.showers) {
    current.weather = "rain";
    current.name = "Rain";
  } else if (currentData.snowfall) {
    current.weather = "snow";
    current.name = "Snow";
  }

  return current;
}
