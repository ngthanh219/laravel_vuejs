let helper = {
    store: null,
    router: null,

    init(store, router) {
        this.store = store;
        this.router = router;
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
    }
}

export default helper;
