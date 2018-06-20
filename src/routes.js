import Home from './components/Home.vue';
import Places from './components/Places.vue';
import Events from './components/Events.vue';
import Weather from './components/Weather.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/places', component: Places },
    { path: '/events', component: Events },
    { path: '/weather', component: Weather }
];