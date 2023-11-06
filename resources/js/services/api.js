const prefix = '/admin/';

let api = {
    env: null,
    helpers: null,
    lang: null,
    store: null,

    init(env, helpers, lang, store) {
        this.env = env;
        this.helpers = helpers;
        this.lang = lang;
        this.store = store;
    },

    async call(actionName, form, success = null, error = null) {
        if (typeof form.error === 'undefined') {
            form.error = {
                message: ''
            };
        }

        await this.store.dispatch(actionName, form)
        .then(res => {
            if (typeof success == 'function') {
                success(res.data);
            }
        })
        .catch(err => {
            if (typeof error == 'function') {
                error(err);
            }
        });
    },

    handle(
        {state},
        method,
        url,
        form = {
            query: {},
            request: {},
            error: {}
        }
    ) {
        var apiUrl = this.env.apiUrl + prefix + url;
        if (method.toLowerCase() == 'put' || method.toLowerCase() == 'delete') {
            apiUrl = apiUrl + '/' + form.id;
        }

        if (state.auth.accessToken) {
            axios.defaults.headers.common = {'Authorization': `Bearer ` + state.auth.accessToken}
        }

        return new Promise((resolve, reject) => {
            var axiosIns = null;
            switch(method.toLowerCase()) {
                case 'get':
                    axiosIns = axios.get(apiUrl + form.query);
                    break;

                case 'post':
                    axiosIns = axios.post(apiUrl, this.helpers.getFormData(form.request));
                    break;

                case 'put':
                    axiosIns = axios.post(apiUrl, this.helpers.getFormData(form.request), {
                        params: {
                            _method: method.toUpperCase()
                        }
                    });
                    break;

                case 'delete':
                    axiosIns = axios.delete(apiUrl, this.helpers.getFormData(form.request));
                    break;
            }

            axiosIns
            .then((res) => {
                this.helpers.clearFormData(form.error);
                resolve(res.data);
            })
            .catch((err) => {
                reject(this.rejectError(err, form.error));
            })
        });
    },

    rejectError(err, formDataError = null) {
        var errors = {
            message: null,
            validation: null
        };

        var notification = {
            success: 0,
            message: null
        };

        if (typeof (err.response) !== 'undefined') {
            this.apiStatus(err.response, errors);
            err = err.response.data;

            if (typeof (err.error) !== 'undefined') {
                errors.message = err.error.error_message;
            }

            if (typeof (err.validation) !== 'undefined') {
                errors.validation = err.validation;
            }

            notification.message = errors.message;
        } else {
            errors.message = this.helpers.lang.get('messages.general_error');
            notification.message = errors.message;
        }

        this.helpers.store.setNotification(notification.success, notification.message);

        return this.handleFormDataError(errors, formDataError);
    },

    apiStatus(response, errors) {
        if (typeof (response.status) !== 'undefined') {
            switch (response.status) {
                case 401: {
                    this.helpers.store.setAuth({
                        user: null,
                        access_token: null
                    });

                    this.helpers.store.setNotification(0, null);
                    break;
                }

                case 404: {
                    errors.message = response.data.message;
                    break;
                }
            }
        }
    },

    handleFormDataError(errors, formDataError) {
        if (errors.validation) {
            for (var param in formDataError) {
                formDataError[param] = '';

                if (errors.validation[param]) {
                    formDataError[param] = errors.validation[param][0];
                }
            }
        } else {
            this.helpers.clearFormData(formDataError);
            formDataError.message = errors.message;
        }
    
        return formDataError;
    },
}

export default api;
