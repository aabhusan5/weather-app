const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  console.log(url);

  const response = await fetch(url);

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
export async function getForecast(city) {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
        throw new Error("Couldn't load forecast.");
    }

    const data = await response.json();

    // Return the next 6 forecast intervals (3 hours apart)
    return data.list.slice(0, 4);
}
export async function getWeatherByCoords(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function getForecastByCoords(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Couldn't load forecast.");
  const data = await response.json();
  return data.list.slice(0, 4);
}