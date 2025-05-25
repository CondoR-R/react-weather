// импорт библиотек
import { createContext } from "react";

// импорт типов
import type { Hourly } from "../types/Hourly";
import type { Current } from "../types/Current";
import type { Daily } from "../types/Daily";
import type { Tommorow } from "../types/Tommorow";

export const AppContext = createContext<{
  hourly?: Hourly;
  current?: Current;
  daily?: Daily[];
  tommorow?: Tommorow;
  city?: string;
  isLoadingForecast: boolean;
  isLoadingCity: boolean;
  error: string;
  setSearchValue: (arg: string) => void;
}>({
  setSearchValue: () => {},
  isLoadingForecast: true,
  isLoadingCity: true,
  error: "",
});
