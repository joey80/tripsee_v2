<template>
  <div>
    <div v-if="loading" class="loading">
      Loading events
      <div class="circle"></div>
    </div>
    <div v-if="!loading" class="events-container">
      <span class="tag"
        >Upcoming Events In
        <span class="tag-primary-color"
          >&nbsp;{{ location.cityName }}</span
        ></span
      >
      <swiper :options="swiperOption">
        <swiper-slide v-for="event in events" :key="event._attributes.id">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  v-if="event.image.url"
                  :src="event.image.url._text"
                  :alt="event.title._text"
                />
                <img
                  v-else
                  src="http://via.placeholder.com/350x350"
                  :alt="event.title._text"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="card-title">{{ event.title._text }}</p>
                  <p class="card-subtitle">
                    {{ formatTheDate(event.start_time._text) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { eventBus, state } from "../main";
import axios from "axios";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
const convert = require("xml-js");

export default {
  components: {
    swiper,
    swiperSlide
  },
  data: function() {
    return {
      events: "",
      location: "",
      loading: false,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  created() {
    if (state != null) {
      const appState = JSON.parse(localStorage.getItem("state"));
      this.location = appState.location;
      this.events = appState.events;
    }
  },
  methods: {
    formatTheDate(date) {
      const dateObj = new Date(date);
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const newDate = month + "/" + day + "/" + year;
      const newTime = dateObj.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });

      return `${newDate} @ ${newTime}`;
    }
  },
  mounted() {
    eventBus.$on("newLocation", location => {
      // Shows the loading animation
      this.loading = true;

      // Searches for events from the lat and lng of the city name or zipcode that was queried
      const token = `&app_key=${process.env.VUE_APP_EVENTS_API}`;
      const endpoint = "http://api.eventful.com/rest/events/search?";
      const userLocation = `&where=${location.lat},${location.lng}&within=10`;
      const proxy = "https://cors-anywhere.herokuapp.com/";

      axios.get(`${proxy}${endpoint}${userLocation}${token}`).then(response => {
        const res = convert.xml2json(response.data, {
          compact: true,
          spaces: 4
        });

        this.results = JSON.parse(res);

        // Store the repsonse in the state.events object
        state.events = this.results.search.events.event;

        // Update the data with the new events and city name (inside of location)
        this.events = state.events;
        this.location = location;

        // Hides the loading animation showing the new data in the template
        this.loading = false;

        // Save it to LocalStorage
        localStorage.setItem("tripsee_state", JSON.stringify(state));
      });
    });
  }
};
</script>

<style scoped>
.events-container {
  margin: 60px 0 30px 0;
}
.tag {
  margin-bottom: 20px;
  background-color: #323232;
  color: #fff;
  font-size: 0.8em;
}
.tag-primary-color {
  color: rgb(139, 195, 74);
}
.card {
  height: 350px;
  padding-bottom: 40px;
}
.card-title {
  font-size: 0.9em;
  font-weight: bold;
}
.card-subtitle {
  padding-top: 5px;
  font-size: 0.6em;
}
.card-content {
  padding: 10px;
}
.loading {
  margin: 40px auto;
  text-align: center;
  font-weight: bold;
  font-size: 0.7em;
  text-transform: uppercase;
}
.circle {
  margin: 20px auto;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-top-color: #7fa953;
  animation: spin 1s infinite linear;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
