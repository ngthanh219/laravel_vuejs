// Env
import env from '../env.js';

// Lang
import lang from '../lang/index.js';

// Modules
import appInstance from '../modules/app.js';
import routerInstance from '../modules/router.js';
import storeInstance from '../modules/store.js';

// Helpers
import helper from '../helpers/helper.js';
import storeHelper from '../helpers/store.js';
import routerHelper from '../helpers/router.js';
import langHelper from '../helpers/lang.js';

// Libraries
import libraries from '../libraries/index.js';

// Services
import services from '../services/index.js';

// Create instance
let instances = (App, routes, storeApp) => {
    // Create store
    const store = storeInstance.init(
        storeApp.state,
        storeApp.actions,
        storeApp.mutations,
        storeApp.getters,
        storeApp.localStorageKey
    );

    // Create router
    const router = routerInstance.init(routes);

    // Create helpers
    storeHelper.init(store);
    routerHelper.init(router);
    langHelper.init(env, lang);
    const helpers = {
        ...helper,
        store: storeHelper,
        router: routerHelper,
        lang: langHelper
    };

    // Create services
    services.api.init(env, helpers, lang, store);

    appInstance(
        App,
        router,
        store,
        env,
        helpers,
        libraries,
        services
    );
}

export default instances;
