import env from '../env.js';
import lang from '../lang/index.js';
import appInstance from '../modules/app.js';
import routerInstance from '../modules/router.js';
import storeInstance from '../modules/store.js';
import helper from '../modules/helper.js';

let instances = {
    env,
    lang,
    helper,
    appInstance,
    routerInstance,
    storeInstance,
}

export default instances;
