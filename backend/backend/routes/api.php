<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['api']], function () {
    Route::post('/registration', 'AuthController@register');
    Route::post('/login', 'AuthController@login');
    Route::get('/get-csrf', 'AuthController@csrf');
});

Route::group(['middleware' => ['jwt-auth']], function () {
    Route::get('/logged_in', 'AuthController@loggedId');
    Route::get('/get-all-clients', 'ClientController@getAll');
    Route::post('/create-client', 'ClientController@createClient');
});
