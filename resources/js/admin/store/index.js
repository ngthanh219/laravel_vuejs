import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
import storeInstance from '../../modules/store.js';

let state = {
    isUpdating: false,
    isPageLoading: false,
    auth: {
        user: null,
        accessToken: null
    },
    notification: {
        success: 0,
        message: null
    },
};
let localStorageKey = 'c_admin';
const store = storeInstance.init(state, actions, mutations, getters, localStorageKey);

export default store;
