<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = true;

    /*protected function tokensMatch($request)
    {
        $token = $this->getTokenFromRequest($request);
        var_dump($token, $request->headers->all());
        if($token === $this->encrypter->decrypt($request->header('X-XSRF-TOKEN'), static::serialized())) {
            return true;
        }

        return false;
    }*/

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'get-csrf',
        'logged_in'
    ];
}
