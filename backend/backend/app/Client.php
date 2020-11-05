<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email'
    ];

    /**
     * Get the user that owns the client.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
