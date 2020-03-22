import axios from 'axios';

/**
 * getGeocodePosition - returns the lat and lng from a location lookup
 * @param query - either a name of a city or a zipcode
 */
export const getGeocodePosition = async query => {
  const encodedAddress = encodeURIComponent(query);
  const googleAPIKey = process.env.VUE_APP_GOOGLE_API_KEY;
  const googleEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleAPIKey}`;
  const result = await axios.get(googleEndpoint);

  return {
    lat: result.data.results[0].geometry.location.lat,
    lng: result.data.results[0].geometry.location.lng,
    formattedAddress: result.data.results[0].formatted_address,
    cityName: result.data.results[0].formatted_address.split(',')[0]
  };
};
