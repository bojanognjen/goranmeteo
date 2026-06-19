import WeatherIcon from "./WeatherIcon";
import { wmoCodes } from "../wmo";

interface CurrentProps {
  currentTemperature: number | undefined;
  unit: string;
  condition: number | undefined;
}

export default function Current({ currentTemperature, unit, condition }: CurrentProps) {
  return (
    <div className="current">
      <span className="number">{currentTemperature}{unit}</span>
      <WeatherIcon className="weatherIcon" code={condition} />
      <p>{condition !== undefined ? (wmoCodes[condition]?.sr ?? `${condition} not-available`) : ""}</p>
    </div>
  );
}