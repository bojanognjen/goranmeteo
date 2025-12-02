import WeatherIcon from "./WeatherIcon";

export default function Current( { currentTemperature, unit, condition}) {
    return(
        <div className="degree">
          <span className="number">{currentTemperature}{unit},</span>
          <WeatherIcon code={condition}/>
        </div>
    )
}