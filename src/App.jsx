function App() {
  return (
    <main>
      <h1 className="title">GoranMeteo</h1>

      <div className="heading">
        <div className="location">
        <h2 className="locationTitle">Doboj</h2>
        <img src="#" alt="Termometer" />
      </div>
      <p className="time">Petak, November 28, 1:18 AM</p>
      </div>

      <div className="todayForecast">
        <div className="degree">
          <span className="number">25°</span>
          <img src="#" alt="Slika oblaka" />
        </div>
        <span className="weatherToday"></span>
      </div>

      <div className="followingDays">
        <div className="day">
          <span className="dayOfWeek">Pon</span>
          <img src="" alt="IconForecast" />
          <span>25/15</span>
        </div>
        <div className="day">
          <span className="dayOfWeek">Uto</span>
          <img src="" alt="IconForecast" />
          <span>25/15</span>
        </div>
        <div className="day">
          <span className="dayOfWeek">Sri</span>
          <img src="" alt="IconForecast" />
          <span>25/15</span>
        </div>
        <div className="day">
          <span className="dayOfWeek">Cet</span>
          <img src="" alt="IconForecast" />
          <span>25/15</span>
        </div>
        <div className="day">
          <span className="dayOfWeek">Pet</span>
          <img src="" alt="IconForecast" />
          <span>25/15</span>
        </div>
        <div className="day">
          <span className="dayOfWeek">Sub</span>
          <img src="" alt="IconForecast" />
          <span>25/15</span>
        </div>
        <div className="day">
          <span className="dayOfWeek">Ned</span>
          <img src="" alt="IconForecast" />
          <span>25/15</span>
        </div>
      </div>
    </main>
  );
}

export default App;
