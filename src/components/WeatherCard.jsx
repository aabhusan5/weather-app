import { FaTint, FaWind, FaTemperatureHigh } from "react-icons/fa";

function WeatherCard({ weather, date, time }) {

  return (
    <div className="weather-card">


      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />


      <h1>
        {Math.round(weather.main.temp)}°C
      </h1>


      <h2>
        {weather.weather[0].main}
      </h2>


      <h3>
        {weather.name}, {weather.sys.country}
      </h3>


      <div className="date-time">
    <p className="date">{date}</p>
    <p className="time">{time}</p>
</div>



      <div className="details">


        <div className="detail">

          <FaTint />

          <span>
            {weather.main.humidity}%
          </span>

          <p>
            Humidity
          </p>

        </div>



        <div className="detail">

          <FaWind />

          <span>
            {weather.wind.speed} m/s
          </span>

          <p>
            Wind
          </p>

        </div>



        <div className="detail">

          <FaTemperatureHigh />

          <span>
            {Math.round(weather.main.feels_like)}°C
          </span>

          <p>
            Feels Like
          </p>

        </div>


      </div>


    </div>
  );
}

export default WeatherCard;