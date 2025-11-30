import "./App.css";
import Clock24 from "./Clock";
import Day from "./Day";
import { useEffect, useState } from "react";

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
  let hours = String(time.getHours());
  let minutes = String(time.getMinutes());


  const [weatherData, setWeatherData] = useState(null);

  const latitude = 44.73;
  const longitude = 18.08;

  useEffect(() => {
    async function fetchWeather(lat, lon) {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=44.73&longitude=18.08&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain,cloud_cover_mid,cloud_cover,snowfall&current=temperature_2m,is_day,rain,snowfall,cloud_cover&timezone=Europe%2FBerlin`;

        // Make the request
        const response = await fetch(url);

        // Check if the response is OK (status 200–299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON data
        const data = await response.json();


        // Return or use the data
        return data;
      } catch (error) {
        // Catch network errors or JSON parsing errors
        console.error("Error fetching weather data:", error);
        return null; // or handle error in a way your app needs
      }
    }
    fetchWeather(latitude, longitude)
  }, []);

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
        <div className="degree">
          <span className="number">25°</span>
          <img src="#" alt="Slika oblaka" />
        </div>
        <span className="weatherToday"></span>
      </div>

      <div className="followingDays">
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
      </div>
    </main>
  );
}

export default App;
