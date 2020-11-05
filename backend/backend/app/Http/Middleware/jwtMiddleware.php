<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Http\Request;
use Exception;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class jwtMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = User::where('auth_token', $request->header('token'))->first();
            if(!$user) {
                throw new TokenInvalidException();
            }
        } catch (Exception $e) {
            var_dump("asdadas", $e->getMessage());
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                var_dump("asdadas1");
                return $next($request);
                return response()->json(['error'=>'Token is Invalid']);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                var_dump("asdadas2");
                return $next($request);
                return response()->json(['error'=>'Token is Expired']);
            }else{
                var_dump("asdadas3");
                return $next($request);
                return response()->json(['error'=>'Something is wrong']);
            }
        }
        return $next($request);
    }

    public function authenticate(Request $request)
    {
        dd('asdasdas');
        parent::authenticate($request); // TODO: Change the autogenerated stub
    }

    public function checkForToken(Request $request)
    {
        dd('asdasdas');
        parent::checkForToken($request); // TODO: Change the autogenerated stub
    }

    protected function setAuthenticationHeader($response, $token = null)
    {
        dd('asdasdas');
        return parent::setAuthenticationHeader($response, $token); // TODO: Change the autogenerated stub
    }


}