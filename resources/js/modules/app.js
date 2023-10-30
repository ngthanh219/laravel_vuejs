import '../bootstrap.js';
import { createApp } from 'vue';

let appInstance = (
    component,
    router,
    store,
    env,
    helper
) => {
    const app = createApp(component);

    app.use(store);
    app.use(router);
    app.config.globalProperties.$helper = helper;
    app.config.globalProperties.$env = env;

    app.mount('#app');
};

export default appInstance;
