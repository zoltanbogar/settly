<?php

namespace App\Http\Controllers;

use App\Client;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController
{
    public function getAll()
    {
        $clients = Client::all();

        return Response([
            'success' => true, 'data' => ['status' => 'OK', 'clients' => $clients]
        ], 200);
    }

    public function createClient(Request $request) {
        $rules = [
            'name' => 'required',
            'email' => 'unique:clients|required|max:255|email',
            'user_id' => 'required'
        ];

        $input = $request->only('name', 'email', 'user_id');
        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            return Response([
                'success' => false, 'error' => $validator->messages()
            ], 400);
        }

        $name = $request->name;
        $email = $request->email;
        $user_id = $request->user_id;

        $client = new Client(['name' => $name, 'email' => $email]);

        $user = User::find($user_id);

        $user->clients()->save($client);

        $clients = Client::all();

        return Response([
            'success' => true, 'data' => ['status' => 'OK', 'clients' => $clients]
        ], 201);
    }
}
