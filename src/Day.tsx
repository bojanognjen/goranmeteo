import WeatherIcon from "./WeatherIcon";

interface DayProps {
  day: string;
  condition: number;
  maxTemp: number;
  minTemp: number;
  unit: string;
}

export default function Day({ day, condition, maxTemp, minTemp, unit }: DayProps) {
  return (
    <div className="day">
      <span className="dayOfWeek">{day}</span>
      <WeatherIcon className="icon" code={condition} />
      <div className="tempBlock">
        <span className="maxTemp">{maxTemp}{unit}</span>
        <span className="minTemp">{minTemp}{unit}</span>
      </div>
    </div>
  );
}
