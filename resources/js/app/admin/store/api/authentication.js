import api from "./index.js";

let authentication = {
    login({state}, form) {
        return api.handle({state}, 'post', 'login', form);
    },

    logout({state}, form) {
        return api.handle({state}, 'post', 'logout');
    },
}

export default authentication;
