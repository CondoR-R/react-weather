import { createContext } from "react";

import type { Hourly } from "../types/Hourly";
import type { Current } from "../types/Current";

export const AppContext = createContext<{ hourly?: Hourly; current?: Current }>(
  {}
);
