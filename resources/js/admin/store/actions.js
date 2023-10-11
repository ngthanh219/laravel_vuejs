import authentication from './api/authentication.js';
import user from './api/user.js';

let actions = {
    login: authentication.login,
    logout: authentication.logout,

    getUsers: user.getUsers,
    createUser: user.createUser,
    updateUser: user.updateUser,
    deleteUser: user.deleteUser,
}

export default actions;
