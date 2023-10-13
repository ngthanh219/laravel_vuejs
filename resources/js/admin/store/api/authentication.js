import actionParams from "./index";

let authentication = {
    login({state}, form) {
        return actionParams.handleApi({state}, 'post', 'login', form);
    },

    logout({state}, form) {
        return actionParams.handleApi({state}, 'post', 'logout');
    },
}

export default authentication;
