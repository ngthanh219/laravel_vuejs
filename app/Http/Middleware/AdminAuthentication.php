<?php

namespace App\Http\Middleware;

use App\Libraries\Constant;
use App\Libraries\ErrorCode;
use App\Libraries\HttpStatus;
use App\Services\BaseService;
use Closure;

class AdminAuthentication
{
    protected $baseService;

    public function __construct(
        BaseService $baseService
    ) {
        $this->baseService = $baseService;
    }

    public function handle($request, Closure $next, ...$guard)
    {
        try {
            if (auth()->guard('api')->check()) {
                if (auth()->guard('api')->user()->role_id == Constant::ROLE_ADMIN) {
                    return $next($request);
                }
            }

            return $this->baseService->responseError(__('messages.auth.auth_error'), HttpStatus::UNAUTHORIZED, ErrorCode::AUTH_ERROR);
        } catch (\Exception $ex) {
            return $this->baseService->responseError(__('messages.system.cannot_server'), HttpStatus::SERVICE_UNAVAILABLE, ErrorCode::SERVER_ERROR);
        }
    }
}
