import actionParams from "./index";

let authentication = {
    // login({state}, form) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(actionParams.API + 'login', form.request)
    //         .then((res) => {
    //             actionParams.clearFormDataError(form.error);
    //             resolve(res.data);
    //         })
    //         .catch((err) => {
    //             reject(actionParams.getError(err, form.error));
    //         })
    //     });
    // },

    // logout({state}, form) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(actionParams.API + 'logout')
    //         .then((res) => {
    //             actionParams.clearFormDataError(form.error);
    //             resolve(res.data);
    //         })
    //         .catch((err) => {
    //             reject(actionParams.getError(err, form.error));
    //         })
    //     });
    // },

    login({state}, form) {
        return actionParams.handleApi('post', 'login', form, {state});
    },

    logout({state}, form) {
        return actionParams.handleApi('post', 'logout');
    },
}

export default authentication;
