const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;


export async function getBackground(city, weather) {


    let weatherQuery;


    switch(weather) {

        case "Clear":
            weatherQuery = "sunny sky bright day";
            break;


        case "Clouds":
            weatherQuery = "cloudy sky overcast atmosphere";
            break;


        case "Rain":
            weatherQuery = "rainy street wet roads umbrellas";
            break;


        case "Drizzle":
            weatherQuery = "light rain wet street";
            break;


        case "Thunderstorm":
            weatherQuery = "storm clouds lightning dark sky";
            break;


        case "Snow":
            weatherQuery = "snow winter landscape";
            break;


        default:
            weatherQuery = "city landscape";
    }



    const query = `${city} ${weatherQuery}`;


    const response = await fetch(

        `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=10&client_id=${ACCESS_KEY}`

    );


    if (!response.ok) {

        throw new Error("Couldn't load background.");

    }



    const data = await response.json();



    if (!data.results.length) {

        return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

    }



    const randomImage =
        data.results[
            Math.floor(Math.random() * data.results.length)
        ];



    return randomImage.urls.full;

}