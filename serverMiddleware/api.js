const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

// Google
app.all('/google/:location', async (req, res) => {
  const { location } = req.params;
  const googleEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`;
  try {
    const result = await axios.get(googleEndpoint);
    res
      .json({
        lat: result.data.results[0].geometry.location.lat,
        lng: result.data.results[0].geometry.location.lng,
        formattedAddress: result.data.results[0].formatted_address,
        cityName: result.data.results[0].formatted_address.split(',')[0],
      })
      .end();
  } catch (error) {
    res
      .status(500)
      .send('GET failed from Google')
      .end();
  }
});

// Weather
app.all('/weather', async (req, res) => {
  const { lat, lng } = req.query;
  const weatherEndpoint = `https://api.darksky.net/forecast/${process.env.VUE_APP_WEATHER_API_KEY}/${lat},${lng}`;
  try {
    const result = await axios.get(weatherEndpoint);
    res
      .json({
        temp: result.data.currently.temperature,
        description: result.data.currently.summary,
        icon: result.data.currently.icon,
        forecast: result.data.daily.summary,
      })
      .end();
  } catch (error) {
    res
      .status(500)
      .send('GET failed from DarkSky')
      .end();
  }
});

// Yelp
app.all('/yelp', async (req, res) => {
  const { lat, lng } = req.query;
  const yelpURL = 'https://api.yelp.com/v3/businesses/search';
  const yelpEndpoint = `${yelpURL}?&latitude=${lat}&longitude=${lng}&radius=5000&term=Food`;

  try {
    const result = await axios.get(yelpEndpoint, {
      headers: {
        Authorization: `Bearer ${process.env.VUE_APP_YELP_API_KEY}`,
      },
    });

    res.json(result.data.businesses).end();
  } catch (error) {
    res.send(error).end();
  }
});

module.exports = app;
