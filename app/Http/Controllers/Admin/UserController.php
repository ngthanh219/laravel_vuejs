<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\GetUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    public function index(GetUserRequest $request)
    {
        return $this->userService->index($request);
    }

    public function store(CreateUserRequest $request)
    {
        return $this->userService->store($request);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        return $this->userService->update($request, $id);
    }

    public function destroy(Request $request, $id)
    {
        return $this->userService->destroy($request, $id);
    }
}
