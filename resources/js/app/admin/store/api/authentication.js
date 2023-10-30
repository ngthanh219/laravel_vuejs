import services from "./index.js";

let authentication = {
    login({state}, form) {
        return services.callApi({state}, 'post', 'login', form);
    },

    logout({state}, form) {
        return services.callApi({state}, 'post', 'logout');
    },
}

export default authentication;
