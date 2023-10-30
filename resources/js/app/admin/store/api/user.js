import services from "./index.js";

let user = {
    getUsers({state}, form) {
        return services.callApi({state}, 'get', 'users', form);
    },

    createUser({state}, form) {
        return services.callApi({state}, 'post', 'users', form);
    },

    updateUser({state}, form) {
        return services.callApi({state}, 'put', 'users', form);
    },

    deleteUser({state}, form) {
        return services.callApi({state}, 'delete', 'users', form);
    },
}

export default user;
