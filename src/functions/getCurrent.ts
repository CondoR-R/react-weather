import type { Current } from "../App/App";

export default function getCurrent(currentData: {
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
  };

  if (currentData.cloud_cover > 50) current.weather = "cloudy";
  else if (currentData.cloud_cover !== 0) current.weather = "partlyCloudy";
  else if (currentData.rain || currentData.showers) current.weather = "rain";
  else if (currentData.snowfall) current.weather = "snow";

  console.log(current);

  return current;
}
