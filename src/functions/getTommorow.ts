import type { Tommorow } from "../types/Tommorow";

export function getTommorow(dailyData: {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}): Tommorow {
  const todayTemp =
    (dailyData.temperature_2m_max[0] + dailyData.temperature_2m_min[0]) / 2;
  const tommorowTemp =
    (dailyData.temperature_2m_max[1] + dailyData.temperature_2m_min[1]) / 2;

  const tommorow: Tommorow = {
    text: tommorowTemp < todayTemp ? "холоднее" : "теплее",
    value: Math.round(Math.abs(todayTemp - tommorowTemp)),
  };

  return tommorow;
}
