import WeatherIcon from "./WeatherIcon";

export default function Day ({day, condition, maxTemp, minTemp, unit}) {
    return (
        <div className="day">
          <span className="dayOfWeek">{day}</span>
          <WeatherIcon code={condition}/>
          <span>{maxTemp}{unit}/{minTemp}{unit}</span>
        </div>
    )
}