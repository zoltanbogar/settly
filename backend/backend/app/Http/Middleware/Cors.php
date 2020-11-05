<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Exception\SuspiciousOperationException;

class Cors
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
        $allowedHosts = explode(',', env('ALLOWED_DOMAINS'));
        $requestHost = parse_url($request->headers->get('origin'),  PHP_URL_HOST);

        if(!in_array($requestHost, $allowedHosts, false)) {
            throw new SuspiciousOperationException('This host is not allowed');
        }

        header('Access-Control-Allow-Origin:   http://localhost:3000');
        header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin, X-CSRF-TOKEN, X-XSRF-TOKEN, TOKEN');
        header('Access-Control-Allow-Credentials:  true');
        header('Access-Control-Allow-Methods:  GET, POST, PUT');

        return $next($request);
    }
}
