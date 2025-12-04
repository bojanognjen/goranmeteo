import "./App.css";
import Clock24 from "./Clock";
import Day from "./Day";
import { useEffect, useState } from "react";
import Current from "./Current";
import partlyCloudyIcon from './assets/icons/partly-cloudy-day.svg';

function App() {
  const [time, setTime] = useState(new Date());

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
  let monthName = months[time.getMonth()];
  let date = time.getDate();
  let hours = String(time.getHours()).padStart(2, "0");
  let minutes = String(time.getMinutes()).padStart(2, "0");

  const [weatherData, setWeatherData] = useState(null);

  const latitude = 44.73;
  const longitude = 18.08;


    const fetchWeather= async (lat, lon) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=44.73&longitude=18.08&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,rain,cloud_cover_mid,cloud_cover,snowfall&current=temperature_2m,is_day,rain,snowfall,cloud_cover,weather_code&timezone=Europe%2FBerlin`;

        // Make the request
        const response = await fetch(url);

        // Check if the response is OK (status 200–299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON data
        const data = await response.json();
        setWeatherData(data);

        // Return or use the data
        return data;
      } catch (error) {
        // Catch network errors or JSON parsing errors
        console.error("Error fetching weather data:", error);
        return null; // or handle error in a way your app needs
      }
    }

  useEffect(()=> {
    fetchWeather(latitude, longitude);
  }, []);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  let temperature = Math.round(weatherData?.current?.temperature_2m);

  let currentCondition = weatherData?.current.weather_code;

  let rotatedWeek = [
    ...daysInWeek.slice(today),
    ...daysInWeek.slice(0, today - 1),
  ];
  let maxTemps = weatherData?.daily?.temperature_2m_max;
  let minTemps = weatherData?.daily?.temperature_2m_min;
  let weatherCodes = weatherData?.daily?.weather_code;
  let units = weatherData?.daily_units?.temperature_2m_max;

  return (
    <main>
      <div className="title">
        <h1>GoranMeteo</h1>
        <img
          className="logo"
          src="./src/assets/icons/partly-cloudy-day.svg"
          alt="Main logo"
        />
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
          <img
            className="thermometer"
            src="./src/assets/icons/thermometer.svg"
            alt="Thermometer"
          />
          <img className="refresh" onClick={fetchWeather} src="src/assets/icons/refresh.svg" alt="Refresh" />
        </div>
      </div>

      <div className="todayForecast">
        <Current
          currentTemperature={temperature}
          unit="°"
          condition={currentCondition}
        />
        <span className="weatherToday"></span>
      </div>

      <div className="followingDays">
        {rotatedWeek.map((day, index) => {
          if (weatherData)
            return (
              <Day
                key={index}
                day={day}
                condition={weatherCodes[index + 1]}
                maxTemp={Math.round(maxTemps[index + 1])}
                minTemp={Math.round(minTemps[index + 1])}
                unit={units}
              />
            );
        })}
      </div>
    </main>
  );
}

export default App;
