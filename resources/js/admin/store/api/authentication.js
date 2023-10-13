import helper from "./index.js";

let authentication = {
    login({state}, form) {
        return helper.handleApi({state}, 'post', 'login', form);
    },

    logout({state}, form) {
        return helper.handleApi({state}, 'post', 'logout');
    },
}

export default authentication;
