import WeatherIcon from "./WeatherIcon";
import { wmoCodes } from "../wmo";

export default function Current( { currentTemperature, unit, condition}) {
    return(
        <div className="current">
          <span className="number">{currentTemperature}{unit}</span>
          <WeatherIcon className="weatherIcon" code={condition}/>
          <p>{wmoCodes[condition]?.sr || `${condition} not-available`}</p>
        </div>
    )
}