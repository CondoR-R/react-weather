import type { Daily } from "../types/Daily";

export function getDaily(dailyData: {
  precipitation_probability_max: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  wind_speed_10m_max: number[];
  cloud_cover_mean: number[];
}): Daily[] {
  const dailyArr: Daily[] = [];
  for (let i = 0; i < 7; i++) {
    const sunrise = dailyData.sunrise[i].slice(
      dailyData.sunrise[i].indexOf("T") + 1
    );
    const sunset = dailyData.sunset[i].slice(
      dailyData.sunset[i].indexOf("T") + 1
    );

    const day = {
      minTemp: Math.round(dailyData.temperature_2m_min[i]),
      maxTemp: Math.round(dailyData.temperature_2m_max[i]),
      wind: Math.round(dailyData.wind_speed_10m_max[i]),
      chance: Math.round(dailyData.precipitation_probability_max[i]),
      date: new Date(dailyData.time[i]).toString().split(" ")[0],
      sunrise: sunrise,
      sunset: sunset,
      weather: "sunny",
    };

    if (dailyData.cloud_cover_mean[i] > 50) day.weather = "cloudy";
    else if (dailyData.cloud_cover_mean[i] !== 0) day.weather = "partlyCloudy";
    else if (dailyData.rain_sum[i] || dailyData.showers_sum[i])
      day.weather = "rain";
    else if (dailyData.snowfall_sum[i]) day.weather = "snow";

    dailyArr.push(day);
  }

  return dailyArr;
}
