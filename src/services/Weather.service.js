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

  //   axios.get(`${proxy}${url}${key}/${location.lat},${location.lng}`).then(response => {
  //     this.temp = response.data.currently.temperature;
  //     this.description = response.data.currently.summary;
  //     this.name = location.cityName;
  //     this.icon = response.data.currently.icon;
  //     this.forecast = response.data.daily.summary;

  //     // Store the repsonse in the state.weather object
  //     state.weather = {
  //       temp: Math.floor(this.temp),
  //       description: this.description,
  //       name: this.name,
  //       icon: this.icon,
  //       forecast: this.forecast
  //     };

  //     this.weather = state.weather;

  //     // Hides the loading animation showing the new data in the template
  //     this.loading = false;

  //     // Save it to LocalStorage
  //     localStorage.setItem('tripsee_state', JSON.stringify(state));
  //   });
};

export const somethingElse = () => null;
