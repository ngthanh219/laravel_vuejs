import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

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

export default {
    state,
    actions,
    mutations,
    getters,
    localStorageKey
};
