import "./App.css";
import Clock24 from "./Clock";
import Day from "./Day";
import { useEffect, useState } from "react";
import Current from "./Current";

function App() {
  const [time, setTime] = useState(new Date());

  let today = time.getDay();
  if (today == 0) today = 7;
  const daysInWeek = [
    "Ponedeljak",
    "Utorak",
    "Srijeda",
    "Cetvrtak",
    "Petak",
    "Subota",
    "Nedelja",
  ];
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

  useEffect(() => {
    async function fetchWeather(lat, lon) {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=44.73&longitude=18.08&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,rain,cloud_cover_mid,cloud_cover,snowfall&current=temperature_2m,is_day,rain,snowfall,cloud_cover&timezone=Europe%2FBerlin`;

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
    fetchWeather(latitude, longitude);
  }, []);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  let temperature = Math.round(weatherData?.current?.temperature_2m);
  let tempUnit = weatherData?.current_units?.temperature_2m;

  const clouds = ["Vedro", "Umjereno oblacno", "Totalno naoblacenje"];
  const cloud = weatherData?.current?.cloud_cover ?? 0;

  const cloudValue = cloud > 74 ? 2 : cloud > 24 ? 1 : 0;
  let otherData = weatherData?.current;

  let rotatedWeek = [...daysInWeek.slice(today), ...daysInWeek.slice(0, today - 1)];
  let maxTemps = weatherData?.daily?.temperature_2m_max;
  let minTemps = weatherData?.daily?.temperature_2m_min;
  let units = weatherData?.daily_units?.temperature_2m_max;

  function getWeatherDescription(code) {
    switch (code) {
      case code == 3:
        return "Oblacno"
      case code < 40:
        return `Nedefinisano ${code}` 
      case code >= 40 && code <= 49:
        return "Maglovito"
      case code >= 50 && code <= 59:
        return "Sitna kisa rominja"
      case code >=60 && code <= 69:
        return "Kisa";
      case code >=70 && code <= 79:
        return "Snijeg";
      case code >= 80 && code <= 99:
        return "Grmljavina"

      default: return "Vedro"
    }
}

  return (
    <main>
      <h1 className="title">GoranMeteo</h1>

      <div className="heading">
        <div className="location">
          <h2 className="locationTitle">Doboj</h2>
          <img src="#" alt="Thermometer" />
        </div>
        <p className="time">
          {weekDayName}, {date}. {monthName}, {hours}:{minutes}h
        </p>
        <Clock24 setTime={setTime} />
      </div>

      <div className="todayForecast">
        <Current
          currentTemperature={temperature}
          unit={tempUnit}
          cloudCover={clouds[cloudValue]}
          otherParameters={otherData}
        />
        <span className="weatherToday"></span>
      </div>

      <div className="followingDays">
        {rotatedWeek.map((day, index)=> {
          if (weatherData) return <Day key={index} day={day} maxTemp={maxTemps[index + 1]} minTemp={minTemps[index + 1]} unit={units}/>
        })}
      </div>
    </main>
  );
}

export default App;
