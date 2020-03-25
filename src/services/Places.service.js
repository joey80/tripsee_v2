import axios from 'axios';

/**
 * getYelpPlaces - returns an array of Yelp sponsored places within the radius of the lat and lng
 */
export const getYelpPlaces = async ({ lat, lng }) => {
  const yelpURL = 'https://api.yelp.com/v3/businesses/search';
  const yelpAPIKey = process.env.VUE_APP_YELP_API_KEY;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const yelpEndpoint = `${proxy}${yelpURL}?&latitude=${lat}&longitude=${lng}&radius=5000&term=Food`;

  try {
    const result = await axios.get(yelpEndpoint, {
      headers: {
        Authorization: `Bearer ${yelpAPIKey}`
      }
    });
    return result.data.businesses;
  } catch (e) {
    return console.log(`GET failed from Yelp. ${e}`);
  }
};
