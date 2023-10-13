<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'v1'
], function () {

    /**
     * Admin API
     */
    Route::group([
        'prefix' => 'admin'
    ], function () {
        Route::post('login', [AuthController::class, 'login']);

        Route::group([
            'middleware' => 'admin.auth'
        ], function () {
            Route::resource('users', UserController::class);

            Route::post('logout', [AuthController::class, 'logout']);
        });
    });


});
