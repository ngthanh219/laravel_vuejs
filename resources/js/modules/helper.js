let helper = {
    store: null,
    router: null,
    lang: null,
    env: null,

    init(store, router, lang, env) {
        this.store = store;
        this.router = router;
        this.lang = lang;
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

    getAuth() {
        var auth = this.store.state.auth;
        if (auth.accessToken != null) {
            return auth;
        }

        return null;
    },
    
    setNotification(success, message) {
        this.store.commit('setNotification', {
            success: success,
            message: message
        });
    },

    scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
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

    queryQueryObject(queryString) {
        var params = {};
        if (queryString.charAt(0) === '?') {
            queryString = queryString.slice(1);
        }
      
        var paramArray = queryString.split('&');
        paramArray.forEach(function(param) {
            var keyValue = param.split('=');
            var key = decodeURIComponent(keyValue[0]);
            var value = decodeURIComponent(keyValue[1]);
            params[key] = value;
        });
      
        return params;
    },

    getCurrentQuery(query) {
        var queryUrl = this.getQueryUrl();

        for (var q in query) {
            if (typeof(queryUrl[q]) !== 'undefined') {
                query[q] = queryUrl[q];
            }
        }
    },

    getFormData(form) {
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
        let hours = (Math.floor(duration / 3600)).toString().padStart(2, '0');
        let minutes = (Math.floor((duration % 3600) / 60)).toString().padStart(2, '0');
        let seconds = (duration % 60).toString().padStart(2, '0');

        if (hours == '00') {
            hours = '';
        } else {
            hours = hours + ':';
        }

        return `${hours}${minutes}:${seconds}`;
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

    clearFormData(formData) {
        if (formData) {
            for (var param in formData) {
                formData[param] = '';
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

    getLang(key) {
        var newKey = key + '.' + this.env.locale;

        try {
            return newKey.split('.').reduce(function(obj, currentKey) {
                return obj[currentKey];
            }, this.lang);
        } catch (err) {
            return key;
        }
    },
}

export default helper;
