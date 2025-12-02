import WeatherIcon from "./WeatherIcon";

export default function Current( { currentTemperature, unit, cloudCover, otherParameters}) {
    return(
        <div className="degree">
          <span className="number">{currentTemperature}{unit},</span>
          <span>{cloudCover},
                {otherParameters?.is_day ? "dan" : "noc"},
                {otherParameters?.rain ? "PADA KISA" : "nema kise"}, 
                {otherParameters?.snowfall ? "PADA SNIJEG" : "nema snijega"} 
          </span>
          <WeatherIcon code={}/>
        </div>
    )
}