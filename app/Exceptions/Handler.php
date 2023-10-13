<?php

namespace App\Exceptions;

use App\Libraries\ErrorCode;
use App\Libraries\HttpStatus;
use App\Libraries\Message;
use App\Services\BaseService;
use Illuminate\Contracts\Container\Container;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    protected $baseService;

    public function __construct(Container $container, BaseService $baseService)
    {
        parent::__construct($container);

        $this->baseService = $baseService;
    }

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if (preg_match('/api\//', $request->getRequestUri())) {
            if ($exception instanceof ValidationException) {
                return $this->baseService->responseError($exception->getMessage(), HttpStatus::BAD_REQUEST, ErrorCode::VALIDATION_ERROR, ['validation' => $exception->errors()]);
            }

            if ($exception instanceof NotFoundHttpException) {
                return $this->baseService->responseError(Message::API_NOT_FOUND, HttpStatus::NOT_FOUND, ErrorCode::API_NOT_FOUND);
            }

            if (!$exception instanceof ValidationException) {
                return $this->baseService->responseError($exception->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR, ErrorCode::SERVER_ERROR);
            }
        }

        return parent::render($request, $exception);
    }
}
