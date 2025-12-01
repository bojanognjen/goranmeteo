export default function Day ({day, wethCode, maxTemp, minTemp, unit}) {
    return (
        <div className="day">
          <span className="dayOfWeek">{day}</span>
          <img src="#" alt="IconForecast" />
          <p>{wethCode}</p>
          <span>{maxTemp}{unit}/{minTemp}{unit}</span>
        </div>
    )
}