let routerHelper = {
    router: null,

    init(router) {
        this.router = router;
    },

    redirectAdmin(path, query = {}) {
        this.router.push({
            path: '/admin/' + path,
            query: query
        })
    },

    handleQueryParam(form) {
        var currentForm = {};

        for (var item in form) {
            if (typeof form[item] == 'number') {
                currentForm[item] = form[item];
            } else if (typeof form[item] == 'string') {
                if (form[item] != '' && form[item] != null) {
                    currentForm[item] = form[item];
                }
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
}

export default routerHelper;
