import type { Hourly } from "../types/Hourly";

export function getHourly(hourlyData: {
  cloud_cover: number[];
  showers: number[];
  rain: number[];
  snowfall: number[];
  time: string[];
  temperature_2m: number[];
  wind_speed_10m: number[];
}): Hourly {
  const hourlyArr = [];
  for (let i = 0; i < 24; i++) {
    if (i % 2 !== 0) continue;

    let weather = "sunny";
    if (hourlyData.cloud_cover[i] > 50) weather = "cloudy";
    else if (hourlyData.cloud_cover[i] !== 0) weather = "partlyCloudy";
    else if (hourlyData.rain[i] || hourlyData.showers[i]) weather = "rain";
    else if (hourlyData.snowfall[i]) weather = "snow";

    const hourlyDay = {
      time: hourlyData.time[i].slice(-5),
      temp: Math.round(hourlyData.temperature_2m[i]),
      weather: weather,
      wind: `${Math.round(hourlyData.wind_speed_10m[i])}`,
    };
    hourlyArr.push(hourlyDay);
  }

  return hourlyArr;
}
