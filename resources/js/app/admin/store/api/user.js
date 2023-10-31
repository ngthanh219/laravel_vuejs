import api from "./index.js";

const prefix = 'users';
let user = {
    get({state}, form) {
        return api.handle({state}, 'get', prefix, form);
    },

    create({state}, form) {
        return api.handle({state}, 'post', prefix, form);
    },

    update({state}, form) {
        return api.handle({state}, 'put', prefix, form);
    },

    delete({state}, form) {
        return api.handle({state}, 'delete', prefix, form);
    },
}

export default user;
