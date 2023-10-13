import axios from 'axios';

let helper = {
    store: null,
    router: null,
    messages: null,
    env: null,

    init(store, router, messages, env) {
        this.store = store;
        this.router = router;
        this.messages = messages;
        this.env = env;
    },

    setPageLoading(isPageLoading) {
        this.store.commit('setIsPageLoading', isPageLoading);
    },

    setAuth(data) {
        var auth = {
            user: (typeof data.user === 'undefined') ? (this.store.state.auth.user ? this.store.state.auth.user : null) : data.user,
            accessToken: (typeof data.access_token === 'undefined') ? (this.store.state.auth.accessToken ? this.store.state.auth.accessToken : null) : data.access_token,
        };

        this.store.commit('setAuth', auth);
    },
    
    setNotification(success, message) {
        this.store.commit('setNotification', {
            success: success,
            message: message
        });
    },

    redirectPage(path, query = {}) {
        this.router.push({
            path: '/admin/' + path,
            query: query
        })
    },

    handleQueryParam(form) {
        var currentForm = {};

        for (var item in form) {
            if (form[item] != '' && form[item] != null) {
                currentForm[item] = form[item];
            }
        }

        return currentForm;
    },

    pushQueryUrl(params) {
        var currentForm = this.handleQueryParam(params);

        this.router.push({
            query: currentForm
        })
    },

    getQueryUrl() {
        return this.router.currentRoute.value.query
    },

    getQueryString(form) {
        var currentForm = this.handleQueryParam(form);

        return '?' + new URLSearchParams(currentForm).toString();
    },

    getCurrentQuery(query) {
        var queryUrl = this.getQueryUrl();

        for (var q in query) {
            if (typeof(queryUrl[q]) !== 'undefined') {
                query[q] = queryUrl[q];
            }
        }
    },

    appendFormData(form) {
        const formData = new FormData();

        for (var param in form) {
            if (form[param] !== null && form[param] !== '') {
                formData.append(param, form[param]);
            }
        }

        return formData;
    },

    isNumber(e) {
        const keyCode = e.keyCode || e.which;
        const keyChar = String.fromCharCode(keyCode);

        const isOnlyNumber = /^[0-9]$/.test(keyChar);
        const isBackspace = keyCode === 8;

        if (!isOnlyNumber && !isBackspace) {
            e.preventDefault();
        }
    },

    formatDuration(duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    },

    mergeArrayData(array1, array2) {
        for (var param in array1) {
            if (typeof (array2[param]) !== 'undefined') {
                array2[param] = array1[param];
            }
        }
    },

    checkChangeFormData(data, form) {
        var check = false;

        if (data !== null) {
            for (var param in data) {
                if (typeof (form[param]) !== 'undefined') {
                    if (form[param] !== data[param]) {
                        check = true;
                    }
                }
            }
        } else {
            for (var param in form) {
                if (form[param] !== '' && form[param] !== null) {
                    check = true;
                }
            }
        }

        return check;
    },

    clearFormDataError(formDataError) {
        if (formDataError) {
            for (var param in formDataError) {
                formDataError[param] = '';
            }
        }
    },

    setQueryPage(query, dataList) {
        if (query.page >= dataList.total_page) {
            query.page = dataList.total_page;
        }

        if (query.page == 0) {
            query.page = 1;
        }
    },

    setQuerySort(query, param) {
        if (query[param] == "desc") {
            query[param] = "asc";
        } else {
            query[param] = "desc";
        }
    },

    getMessage(key) {
        return this.messages[key][this.env.locale];
    },

    handleApi(
        {state},
        method,
        url,
        form = {
            query: {},
            request: {},
            error: {}
        }
    ) {
        var apiUrl = this.env.apiUrl + '/admin/' + url;
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
                    axiosIns = axios.post(apiUrl, this.appendFormData(form.request));
                    break;
    
                case 'put':
                    axiosIns = axios.post(apiUrl, this.appendFormData(form.request), {
                        params: {
                            _method: method.toUpperCase()
                        }
                    });
                    break;
    
                case 'delete':
                    axiosIns = axios.delete(apiUrl, this.appendFormData(form.request));
                    break;
            }
    
            axiosIns
            .then((res) => {
                this.clearFormDataError(form.error);
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
            errors.message = this.getMessage('general_error');
            notification.message = errors.message;
        }
    
        this.setNotification(notification.success, notification.message);
    
        return this.handleFormDataError(errors, formDataError);
    },

    apiStatus(response, errors) {
        if (typeof (response.status) !== 'undefined') {
            switch (response.status) {
                case 401: {
                    this.setAuth({
                        user: null,
                        access_token: null
                    });
            
                    this.setNotification(0, null);
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
            for (var param in formDataError) {
                formDataError[param] = '';
            }
    
            formDataError.message = errors.message;
        }
    
        return formDataError;
    },
}

export default helper;
