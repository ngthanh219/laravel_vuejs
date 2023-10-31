let helper = {
    scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
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
}

export default helper;
