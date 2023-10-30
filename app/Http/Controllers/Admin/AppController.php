<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function index()
    {
        $env = config('app.env');

        return view('admin.app', [  
            'env' => $env
        ]);
    }
}
