import '../bootstrap.js';
import { createApp } from 'vue';

let appInstance = (
    component,
    router,
    store,
    env,
    helpers,
    libraries,
    services
) => {
    const app = createApp(component);

    app.use(store);
    app.use(router);
    app.config.globalProperties.$env = env;
    app.config.globalProperties.$helpers = helpers;

    for (let param in libraries) {
        app.config.globalProperties['$' + param] = libraries[param];
    }

    app.config.globalProperties.$services = services;
    app.mount('#app');
};

export default appInstance;
