<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
//use Tymon\JWTAuth\JWTAuth;
//use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException as JWTAuthException;
//use Tymon\JWTAuth\JWT;
//use Tymon\JWTAuth\JWTGuard;
use JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('api', ['except' => ['login']]);
    }

    public function csrf(Request $request)
    {
        $csrf_token = csrf_token();

        return response()->json(['success' => true, 'csrf_token' => $csrf_token, 'status' => Response::HTTP_OK]);
    }

    public function register(Request $request)
    {
        $rules = [
            'firstname' => 'required',
            'surname' => 'required',
            'email' => 'unique:users|required|max:255',
            'email_confirmation' => 'required',
            'password' => 'required|min:6',
            'password_confirmation' => 'required|min:6',
            'captcha_value' => 'required'
        ];

        $input = $request->only('firstname', 'surname', 'email', 'password', 'email_confirmation', 'password_confirmation', 'captcha_value');
        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            return Response([
                'success' => false, 'error' => $validator->messages()
            ], 400);
        }

        if ($request->email !== $request->email_confirmation) {
            return Response([
                'success' => false, 'error' => ["password" => ['The emails do not match.']]
            ], 400);
        }

        if ($request->password !== $request->password_confirmation) {
            return Response([
                'success' => false, 'error' => ["password" => ['The passwords do not match.']]
            ], 400);
        }

        //$user = \App\User::where('email', $request->email)->get()->first();

        //$user->auth_token = $token; // update user token

        $firstname = $request->firstname;
        $surname = $request->surname;
        $email = $request->email;
        $password = $request->password;
        $captcha_value = $request->captcha_value;

        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = array(
            'secret' => env('CAPTCHA_SECRET'),
            'response' => $captcha_value
        );
        $options = array(
            'http' => array (
                'method' => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        $verify = file_get_contents($url, false, $context);
        $captcha_success=json_decode($verify);
        var_dump($captcha_success);

        dd('asdasdasdas');

        $token = self::getToken($request); // generate user token

        if (!is_string($token)) {
            return Response([
                'success' => false, 'error' => ["token" => ['Token generation failed'], 'generated_token' => $token]
            ], 400);
        }

        $user = User::create(['firstname' => $firstname, 'surname' => $surname, 'email' => $email, 'password' => Hash::make($password), 'auth_token' => $token]);
        Auth::attempt(['email' => $request->email, 'password' => $request->password]);

        return Response([
            'success' => true, 'data' => ['status' => 'created', 'user' => $user]
        ], 201);
    }

    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|max:255',
            'password' => 'required|min:6',
        ];

        $input = $request->only('email', 'password');
        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            return Response([
                'success' => false, 'error' => $validator->messages()
            ], 400);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            //$user = Auth::user();

            $user = \App\User::where('email', $request->email)->get()->first();

            $token = self::getToken($request);
            $user->auth_token = $token;
            $user->save();
            $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];

            return Response([
                'success' => true, 'data' => ['status' => 'created', 'user' => $user,'auth_token'=>$user->auth_token]
            ], 200);
        }

        return Response([
            'success' => false, 'error' => ["user" => ['User does not exist.']]
        ], 400);
    }

    public function loggedId(Request $request) {
        $user = User::where('auth_token', $request->header('token'))->first();

        if($user) {
            return Response([
                'success' => true, 'data' => ['status' => 'logged_in', 'user' => $user]
            ], 200);
        }

        return Response([
            'success' => false, 'error' => ["user" => ['User does not exist.']]
        ], 400);
    }

    private function getToken($request/*$email, $password*/)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(compact('token'));
    }
}
