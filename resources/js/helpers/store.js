let storeHelper = {
    store: null,

    init(store) {
        this.store = store;
    },

    setPageLoading(isPageLoading) {
        this.store.commit('setIsPageLoading', isPageLoading);
    },

    getPageLoading() {
        return this.store.state.isPageLoading;
    },

    setAuth(data) {
        var auth = {
            user: (typeof data.user === 'undefined') ? (this.store.state.auth.user ? this.store.state.auth.user : null) : data.user,
            accessToken: (typeof data.access_token === 'undefined') ? (this.store.state.auth.accessToken ? this.store.state.auth.accessToken : null) : data.access_token,
        };

        this.store.commit('setAuth', auth);
    },

    getAuth() {
        var auth = this.store.state.auth;
        if (auth.accessToken != null) {
            return auth;
        }

        return null;
    },

    setNotification(success, message) {
        this.store.commit('setNotification', {
            success: success,
            message: message
        });
    },

    getNotification() {
        return this.store.state.notification;
    },
}

export default storeHelper;
