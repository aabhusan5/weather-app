function ForecastCard({ forecast }) {

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast">

      <h3>Next 18 Hours</h3>

      <div className="forecast-container">

        {forecast.map((item, index) => (

          <div className="forecast-item" key={index}>

            <p>
              {new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].main}
            />

            <h4>
              {Math.round(item.main.temp)}°
            </h4>

            <span>
              {item.weather[0].main}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ForecastCard;