import authentication from './api/authentication.js';
import user from './api/user.js';

let actions = {
    login: authentication.login,
    logout: authentication.logout,

    getUsers: user.get,
    createUser: user.create,
    updateUser: user.update,
    deleteUser: user.delete,
}

export default actions;
