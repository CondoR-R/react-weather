import { createContext } from "react";
import type { Current, Hourly } from "./App";

export const AppContext = createContext<{ hourly?: Hourly; current?: Current }>(
  {}
);
