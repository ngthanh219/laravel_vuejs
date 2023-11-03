<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActionMultiDataRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'action_type' => 'required|integer|min:0|max:1'
        ];
    }
}
