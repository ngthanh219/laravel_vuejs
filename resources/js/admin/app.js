import './assets/sass/root.scss';
import router from './router/index.js';
import store from './store';
import env from '../env.js';
import App from './App.vue';
import helper from '../modules/helper.js';
import appInstance from '../modules/main.js';

helper.init(store, router);
appInstance(env, router, App, store, helper);
