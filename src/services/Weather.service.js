import axios from 'axios';

/**
 * getWeatherData - gets weather data from a location
 */
export const getWeatherData = async ({ lat, lng }) => {
  const weatherEndpoint = 'https://api.darksky.net/forecast/';
  const weatherAPIKey = process.env.VUE_APP_WEATHER_API_KEY;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const result = await axios.get(`${proxy}${weatherEndpoint}${weatherAPIKey}/${lat},${lng}`);

  return {
    temp: result.data.currently.temperature,
    description: result.data.currently.summary,
    icon: result.data.currently.icon,
    forecast: result.data.daily.summary
  };
};

export const somethingElse = () => null;
