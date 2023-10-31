import './assets/sass/root.scss';
import instances from '../instances.js';
import App from './App.vue';
import routes from './router/index.js';
import storeApp from './store/index.js';

instances(App, routes, storeApp);
