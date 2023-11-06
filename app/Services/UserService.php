<?php

namespace App\Services;

use App\Helpers\GeneralHelper;
use App\Libraries\Constant;
use App\Libraries\ErrorCode;
use App\Libraries\HttpStatus;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserService extends BaseService
{
    protected $user;

    public function __construct(
        User $user
    ) {
        $this->user = $user;
    }

    public function index($request)
    {
        try {
            $users = $this->user;

            if (isset($request->role_id)) {
                $users = $users->where('role_id', $request->role_id);
            }

            if (isset($request->id_sort)) {
                $users = $users->orderBy('id', $request->id_sort);
            }

            if (isset($request->information)) {
                $key = 'email';

                if (is_numeric($request->information)) {
                    $key = 'phone';
                }

                $users = $users->where($key, 'like', '%' . $request->information . '%');
            }

            if (isset($request->is_login)) {
                if ($request->is_login != Constant::IS_ALL_LOGGED) {
                    $users = $users->where('is_login', $request->is_login);
                }
            }

            if (isset($request->is_deleted)) {
                if ($request->is_deleted == Constant::IS_DELETED) {
                    $users = $users->onlyTrashed();
                }
            }

            $data = $this->pagination($users, $request);

            return $this->responseSuccess($data);
        } catch (\Exception $ex) {
            GeneralHelper::detachException(__CLASS__ . '::' . __FUNCTION__, Constant::ERROR_SYSTEM, $ex->getMessage());

            return $this->responseError(__('messages.system.server_error'), HttpStatus::INTERNAL_SERVER_ERROR, ErrorCode::SERVER_ERROR);
        }
    }

    public function store($request)
    {
        try {
            $existEmail = $this->user->where('email', $request->email)->withTrashed()->first();
            if ($existEmail) {
                return $this->responseError(__('messages.user.email_exist'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
            }

            $existPhone = $this->user->where('phone', $request->phone)->withTrashed()->first();
            if ($existPhone) {
                return $this->responseError(__('messages.user.phone_exist'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
            }

            $newData = [
                'role_id' => $request->role_id,
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'email_verified_at' => $request->email_verified_at == Constant::IS_VERIFIED_EMAIL ? now() : null,
                'is_login' => $request->is_login
            ];

            $data = $this->user->create($newData);

            return $this->responseSuccess($data);
        } catch (\Exception $ex) {
            GeneralHelper::detachException(__CLASS__ . '::' . __FUNCTION__, Constant::ERROR_SYSTEM, $ex->getMessage());

            return $this->responseError(__('messages.system.server_error'), HttpStatus::INTERNAL_SERVER_ERROR, ErrorCode::SERVER_ERROR);
        }
    }

    public function update($request, $id)
    {
        try {
            $user = $this->user->find($id);
            
            if (!$user) {
                return $this->responseError(__('messages.user.not_exist'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
            }

            if ($request->email !== $user->email) {
                $existEmail = $this->user->where('id', '!=', $user->id)
                    ->where('email', $request->email)
                    ->first();

                if ($existEmail) {
                    return $this->responseError(__('messages.user.email_exist'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
                }
            }

            if ($request->phone !== $user->phone) {
                $existPhone = $this->user->where('id', '!=', $user->id)
                    ->where('phone', $request->phone)
                    ->first();

                if ($existPhone) {
                    return $this->responseError(__('messages.user.phone_exist'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
                }
            }

            $updatedData = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'is_login' => $request->is_login,
                'role_id' => $request->role_id,
                'email_verified_at' => $request->email_verified_at == Constant::IS_VERIFIED_EMAIL ? now() : null
            ];

            if ($request->is_change_password && $request->password) {
                $updatedData['password'] = bcrypt($request->password);
            }

            $user->update($updatedData);

            return $this->responseSuccess($user);
        } catch (\Exception $ex) {
            GeneralHelper::detachException(__CLASS__ . '::' . __FUNCTION__, Constant::ERROR_SYSTEM, $ex->getMessage());

            return $this->responseError(__('messages.system.server_error'), HttpStatus::INTERNAL_SERVER_ERROR, ErrorCode::SERVER_ERROR);
        }
    }

    public function destroy($request, $id)
    {
        try {
            $loggedUser = auth()->guard('api')->user();
            if ($loggedUser->id == $id) {
                return $this->responseError(__('messages.user.not_delete_logged_user'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
            }

            $user = $this->user->find($id);
            if (!$user) {
                $user = $this->user->withTrashed()->where('id', $id)->first();

                if (!$user) {
                    return $this->responseError(__('messages.user.not_exist'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
                }

                $user->restore();
            } else {
                $user->delete();
            }

            return $this->responseSuccess();
        } catch (\Exception $ex) {
            GeneralHelper::detachException(__CLASS__ . '::' . __FUNCTION__, Constant::ERROR_SYSTEM, $ex->getMessage());

            return $this->responseError(__('messages.system.server_error'), HttpStatus::INTERNAL_SERVER_ERROR, ErrorCode::SERVER_ERROR);
        }
    }

    public function actionMultiData($request)
    {
        try {
            $type = $request->action_type;
            $idArray = json_decode($request->id_array, true);

            if (gettype($idArray) != 'array') {
                return $this->responseError(__('messages.id_array.invalid'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
            }

            $loggedUser = auth()->guard('api')->user();
            foreach ($idArray as $id) {
                if (!is_int($id)) {
                    return $this->responseError(__('messages.id_array.item_not_int'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
                } else {
                    if ($loggedUser->id == $id) {
                        return $this->responseError(__('messages.user.not_delete_logged_user'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
                    }
                }
            }

            $existId = $this->user->withTrashed()->whereIn('id', $idArray)->count();
            if (count($idArray) > $existId) {
                return $this->responseError(__('messages.id_array.invalid'), HttpStatus::BAD_REQUEST, ErrorCode::PARAM_INVALID);
            }
        } catch (\Exception $ex) {
            GeneralHelper::detachException(__CLASS__ . '::' . __FUNCTION__, Constant::ERROR_LOGIC, $ex->getMessage());

            return $this->responseError(__('messages.system.logic_error'), HttpStatus::INTERNAL_SERVER_ERROR, ErrorCode::SERVER_ERROR);
        }

        DB::beginTransaction();
        try {
            switch ($type) {
                case Constant::ACTION_TYPE_DELETE:
                    $this->user->whereIn('id', $idArray)->delete();
                    DB::commit();
                    break;

                case Constant::ACTION_TYPE_RESTORE:
                    $this->user->withTrashed()->whereIn('id', $idArray)->restore();
                    DB::commit();
                    break;
                
                default:
                    DB::rollBack();
                    break;
            }

            return $this->responseSuccess();
        } catch (\Exception $ex) {
            DB::rollBack();
            GeneralHelper::detachException(__CLASS__ . '::' . __FUNCTION__, Constant::ERROR_SYSTEM, $ex->getMessage());

            return $this->responseError(__('messages.system.server_error'), HttpStatus::INTERNAL_SERVER_ERROR, ErrorCode::SERVER_ERROR);
        }
    }
}
