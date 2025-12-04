import WeatherIcon from "./WeatherIcon";

export default function Day({ day, condition, maxTemp, minTemp, unit }) {
  return (
    <div className="day">
      <span className="dayOfWeek">{day}</span>
      <WeatherIcon className="icon" code={condition} />
      <div className="tempBlock">
        <span className="maxTemp">{maxTemp}°</span>
        <span className="minTemp">{minTemp}°</span>
      </div>
    </div>
  );
}
