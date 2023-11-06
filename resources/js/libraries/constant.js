const constant = {
    NO_DATA: 0,
    PAGINATION: {
        LIMIT: 15,
        PAGE: 1
    },
    ORDER_BY: {
        DESC: 'desc',
        ASC: 'asc'
    },
    IS_DELETE: {
        NO: 0,
        YES: 1
    },
    NOTIFICATION: {
        FAIL: 0,
        SUCCESS: 1
    },
    USER: {
        ROLE: {
            ADMIN: 0,
            USER: 1
        },
        DEFAULT_PASSWORD: '123456',
        IS_CHANGE_PASSWORD: {
            NO: 0,
            YES: 1
        },
        LOGIN_STATUS: {
            NOT_LOGGED: 0,
            LOGGED: 1,
            ALL: 2
        },
        IS_VERIFIED_EMAIL: {
            NO: 0,
            YES: 1,
        },
        ACTION_TYPE: {
            DELETE: 0,
            RESTORE: 1
        }
    }
}

export default constant;
