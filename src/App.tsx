import "./App.css";
import Clock24 from "./Clock";
import Day from "./Day";
import { useEffect, useState } from "react";
import Current from "./Current";
import logo from "./assets/icons/partly-cloudy-day.svg";
import thermometer from "./assets/icons/thermometer.svg";
import refresh from "./assets/icons/refresh.svg";

interface WeatherCurrent {
  temperature_2m: number;
  is_day: number;
  rain: number;
  snowfall: number;
  cloud_cover: number;
  weather_code: number;
}

interface WeatherDaily {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

interface WeatherData {
  current: WeatherCurrent;
  daily: WeatherDaily;
  daily_units: { temperature_2m_max: string };
}

function App() {
  const [time, setTime] = useState<Date>(new Date());

  let today = time.getDay();
  if (today == 0) today = 7;
  const daysInWeek = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
  const months = [
    "januar",
    "februar",
    "mart",
    "april",
    "maj",
    "jun",
    "jul",
    "avgust",
    "septembar",
    "oktobar",
    "novembar",
    "decembar",
  ];
  const weekDayName = daysInWeek[today - 1];
  const monthName = months[time.getMonth()];
  const date = time.getDate();
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const latitude = 44.73;
  const longitude = 18.08;

  const fetchWeather = async (lat: number, lon: number): Promise<WeatherData | null> => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,rain,cloud_cover_mid,cloud_cover,snowfall&current=temperature_2m,is_day,rain,snowfall,cloud_cover,weather_code&timezone=Europe%2FBerlin`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as WeatherData;
      setWeatherData(data);
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  useEffect(() => {
    void fetchWeather(latitude, longitude);
  }, []);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  const temperature = weatherData ? Math.round(weatherData.current.temperature_2m) : undefined;
  const currentCondition = weatherData?.current.weather_code;

  const rotatedWeek = [
    ...daysInWeek.slice(today),
    ...daysInWeek.slice(0, today - 1),
  ];
  const maxTemps = weatherData?.daily.temperature_2m_max;
  const minTemps = weatherData?.daily.temperature_2m_min;
  const weatherCodes = weatherData?.daily.weather_code;
  const units = weatherData?.daily_units.temperature_2m_max;
  console.log(weatherCodes);

  return (
    <main>
      <div className="title">
        <h1>GoranMeteo</h1>
        <img className="logo" src={logo} alt="Main logo" />
      </div>

      <div className="heading">
        <div className="location">
          <h2 className="locationTitle">Doboj</h2>
          <p className="time">
            {weekDayName}, {date}. {monthName}, {hours}:{minutes}h
            <Clock24 setTime={setTime} />
          </p>
        </div>
        <div className="upper-icons">
          <img className="thermometer" src={thermometer} alt="Thermometer" />
          <img
            className="refresh"
            onClick={() => void fetchWeather(latitude, longitude)}
            src={refresh}
            alt="Refresh"
          />
        </div>
      </div>

      <div className="todayForecast">
        <Current
          currentTemperature={temperature}
          unit="°"
          condition={currentCondition}
        />
      </div>

      <div className="followingDays">
        {weatherData &&
          rotatedWeek.map((day, index) => (
            <Day
              key={index}
              day={day}
              condition={weatherCodes![index + 1]!}
              maxTemp={Math.round(maxTemps![index + 1]!)}
              minTemp={Math.round(minTemps![index + 1]!)}
              unit={units!}
            />
          ))}
      </div>
    </main>
  );
}

export default App;
