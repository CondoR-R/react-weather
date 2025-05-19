import type React from "react";
import CurrentBox from "../parentComponents/CurrentBox/CurrentBox";
import ForecastBox from "../parentComponents/ForecastBox/ForecastBox";

const App: React.FC = () => {
  return (
    <div className="app">
      <CurrentBox />
      <ForecastBox />
    </div>
  );
};

export default App;
