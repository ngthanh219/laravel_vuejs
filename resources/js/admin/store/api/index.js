import axios from 'axios';
import env from '../../../env';
import helper from '../../../modules/helper.js';
import messages from '../../../lang/messages.js';

const errorMessage = messages.general_error.vi;

function handleApi(
    {state},
    method,
    url,
    form = {
        query: {},
        request: {},
        error: {}
    }
) {
    var apiUrl = env.apiUrl + '/admin/';

    if (state.auth.accessToken) {
        axios.defaults.headers.common = {'Authorization': `Bearer ` + state.auth.accessToken}
    }

    return new Promise((resolve, reject) => {
        var axiosIns = null;

        if (method != 'get') {
            var config = {};
            if (method != 'post') {
                config = {
                    params: {
                        _method: method
                    }
                }
            }

            axiosIns = axios.post(apiUrl + url, form.request, config);
        } else {
            axiosIns = axios.get(apiUrl + url + form.query);
        }

        axiosIns
        .then((res) => {
            clearFormDataError(form.error);
            resolve(res.data);
        })
        .catch((err) => {
            reject(rejectError(err, form.error));
        })
    });
}

function handleFormDataError(errors, formDataError) {
    if (errors.validation) {
        for (var param in formDataError) {
            formDataError[param] = '';

            if (errors.validation[param]) {
                formDataError[param] = errors.validation[param][0];
            }
        }
    } else {
        for (var param in formDataError) {
            formDataError[param] = '';
        }

        formDataError.message = errors.message;
    }

    return formDataError;
}

function apiStatus(response, errors) {
    if (typeof (response.status) !== 'undefined') {
        switch (response.status) {
            case 401: {
                helper.setAuth({
                    user: null,
                    access_token: null
                });
        
                helper.setNotification(0, null);
                break;
            }
            
            case 404: {
                errors.message = response.data.message;
                break;
            }
        }
    }
}

function rejectError(err, formDataError = null) {
    var errors = {
        message: null,
        validation: null
    };

    var notification = {
        success: 0,
        message: null
    };

    if (typeof (err.response) !== 'undefined') {
        apiStatus(err.response, errors);
        err = err.response.data;

        if (typeof (err.error) !== 'undefined') {
            errors.message = err.error.error_message;
        }

        if (typeof (err.validation) !== 'undefined') {
            errors.validation = err.validation;
        }

        notification.message = errors.message;
    } else {
        errors.message = errorMessage;
        notification.message = errors.message;
    }

    helper.setNotification(notification.success, notification.message);

    return handleFormDataError(errors, formDataError);
}

function clearFormDataError(formError) {
    helper.clearFormDataError(formError);
}

const actionParams = {
    API: env.api + 'admin/',
    handleApi: handleApi,
    getError: rejectError,
    clearFormDataError: clearFormDataError,
};

export default actionParams;
