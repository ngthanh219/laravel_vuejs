import helper from "./index.js";

let user = {
    getUsers({state}, form) {
        return helper.handleApi({state}, 'get', 'users', form);
    },

    createUser({state}, form) {
        return helper.handleApi({state}, 'post', 'users', form);
    },

    updateUser({state}, form) {
        return helper.handleApi({state}, 'put', 'users', form);
    },

    deleteUser({state}, form) {
        return helper.handleApi({state}, 'delete', 'users', form);
    },
}

export default user;
