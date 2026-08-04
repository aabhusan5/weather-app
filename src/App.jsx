import { useEffect, useState } from "react";
import defaultBg from "./assets/default-bg.jpg";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { getBackground } from "./services/imageApi";
import LocationPicker from "./components/LocationPicker";
import { getWeather, getForecast, getWeatherByCoords, getForecastByCoords } from "./services/weatherApi";
function App() {
  const [forecast, setForecast] = useState([]);
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState(defaultBg);
  const [loading, setLoading] = useState(false);
  const [timezone, setTimezone] = useState(0);
  const [cityTime, setCityTime] = useState("");
  const [cityDate, setCityDate] = useState("");
  const [showMap, setShowMap] = useState(false);

  const getCityDateTime = () => {

    const now = new Date();

    const utc =
      now.getTime() +
      now.getTimezoneOffset() * 60000;


    const cityDateTime = new Date(
      utc + timezone * 1000
    );


    return cityDateTime;
  };


  useEffect(() => {

    if (!weather) return;


    const updateTime = () => {

      const cityDateTime = getCityDateTime();


      setCityTime(
        cityDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );


      setCityDate(
        cityDateTime.toLocaleDateString([], {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      );

    };


    updateTime();


    const interval = setInterval(
      updateTime,
      1000
    );


    return () => clearInterval(interval);


  }, [timezone, weather]);



const applyWeatherData = async (data, forecastData) => {
  setWeather(data);
  setForecast(forecastData);
  setTimezone(data.timezone);

  const image = await getBackground(
    `${data.name} ${data.sys.country}`,
    data.weather[0].main
  );
  setBackground(image);
};

const handleSearch = async (city) => {
  try {
    setLoading(true);
    const data = await getWeather(city);
    const forecastData = await getForecast(city);
    await applyWeatherData(data, forecastData);
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

const handleLocationSelect = async (lat, lon) => {
  try {
    setLoading(true);
    setShowMap(false);
    const data = await getWeatherByCoords(lat, lon);
    const forecastData = await getForecastByCoords(lat, lon);
    await applyWeatherData(data, forecastData);
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};



  return (

    <div
  className="app"
  style={{
    backgroundImage: background
      ? `
        linear-gradient(
          rgba(0,0,0,.35),
          rgba(0,0,0,.35)
        ),
        url(${background})
        `
      : `
        linear-gradient(
          to bottom,
          #4facfe,
          #8ec5fc,
          #b8c6d9
        )
        `
  }}
>
{showMap && (
  <LocationPicker
    onSelect={handleLocationSelect}
    onClose={() => setShowMap(false)}
  />
)}
{!weather && (
  <div className="container">
    <h1>Weather App</h1>

    <SearchBar
      onSearch={handleSearch}
      onMapClick={() => setShowMap(true)}
    />

    {loading && <p>Loading...</p>}
  </div>
)}

{weather && (
  <div className="weather-layout">

    <div className="left-panel">

      <div className="container">

        <WeatherCard
          weather={weather}
          cityDate={cityDate}
          cityTime={cityTime}
        />

        <ForecastCard forecast={forecast} />

        <SearchBar
          onSearch={handleSearch}
          onMapClick={() => setShowMap(true)}
        />

      </div>

    </div>

  </div>
)}

    </div>

  );
}


export default App;