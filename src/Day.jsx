export default function Day ({day, maxTemp, minTemp, unit}) {
    return (
        <div className="day">
          <span className="dayOfWeek">{day}</span>
          <img src="#" alt="IconForecast" />
          <span>{maxTemp}{unit}/{minTemp}{unit}</span>
        </div>
    )
}