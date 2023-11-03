<?php

namespace App\Libraries;

class Constant
{
    const ROLE_ADMIN = 0;
    const ROLE_CLIENT = 1;

    const IS_NOT_LOGGED = 0;
    const IS_LOGGED = 1;
    const IS_ALL_LOGGED = 2;

    const IS_SHOW = 0;
    const IS_NOT_SHOW = 1;
    const IS_ALL_SHOW = 2;

    const IS_NOT_CHANGE_PASSWORD = 0;
    const IS_CHANGE_PASSWORD = 1;

    const IS_DELETED = 1;

    const IS_NOT_VERIFIED_EMAIL = 0;
    const IS_VERIFIED_EMAIL = 1;

    const ACTION_TYPE_DELETE = 0;
    const ACTION_TYPE_RESTORE = 1;

    const ERROR_LOGIC = 'Logic';
    const ERROR_SYSTEM = 'Try catch';
}
