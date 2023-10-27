import './assets/sass/root.scss';
import router from './router/index.js';
import store from './store';
import env from '../env.js';
import App from './App.vue';
import messages from '../lang/messages.js';
import lang from '../lang/index.js';
import helper from '../modules/helper.js';
import appInstance from '../modules/main.js';

helper.init(store, router, lang, messages, env);
appInstance(env, router, App, store, helper);
