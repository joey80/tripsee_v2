import axios from 'axios';

const convert = require('xml-js');

/**
 * getEventfulEvents - returns an array of events from Eventful
 */
export const getEventfulEvents = async ({ lat, lng }) => {
  const eventURL = 'http://api.eventful.com/rest/events/search?';
  const eventAPIKey = `&app_key=${process.env.VUE_APP_EVENTS_API_KEY}`;
  const userLocation = `&where=${lat},${lng}&within=10`;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const eventEndpoint = `${proxy}${eventURL}${userLocation}${eventAPIKey}`;

  try {
    const result = await axios.get(eventEndpoint);
    const res = convert.xml2json(result.data, {
      compact: true,
      spaces: 4
    });
    return JSON.parse(res);
  } catch (e) {
    return console.log(`GET failed from Eventful. ${e}`);
  }
};
