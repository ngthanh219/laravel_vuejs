<?php

namespace App\Libraries;

use Illuminate\Http\Response;

class HttpStatus
{
    const OK = Response::HTTP_OK;
    const BAD_REQUEST = Response::HTTP_BAD_REQUEST;
    const UNAUTHORIZED = Response::HTTP_UNAUTHORIZED;
    const FORBIDDEN = Response::HTTP_FORBIDDEN;
    const NOT_FOUND = Response::HTTP_NOT_FOUND;
    const INTERNAL_SERVER_ERROR = Response::HTTP_INTERNAL_SERVER_ERROR;
    const SERVICE_UNAVAILABLE = Response::HTTP_SERVICE_UNAVAILABLE;
}
