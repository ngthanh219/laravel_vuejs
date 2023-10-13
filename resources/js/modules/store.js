import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

let storeInstance = {
    init(state, actions, mutations, getters, localStorageKey) {
        return createStore({
            state: state,
            actions,
            mutations,
            getters,
            plugins: [
                createPersistedState({
                    key: localStorageKey
                })
            ],
        })
    }
}

export default storeInstance;
