import './assets/sass/root.scss';
import instances from '../index.js';
import App from './App.vue';
import routes from './router/index.js';
import storeApp from './store/index.js';

// Create router
const router = instances.routerInstance.init(routes);

// Create store
const store = instances.storeInstance.init(
    storeApp.state,
    storeApp.actions,
    storeApp.mutations,
    storeApp.getters,
    storeApp.localStorageKey
);

// Create helper
instances.helper.init(store, router, instances.lang, instances.env);

// Create app
instances.appInstance(App, router, store, instances.env, instances.helper);
