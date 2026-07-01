<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageAccount extends Model
{

    protected $fillable = [
        'user_id',
        'provider',
        'email',
        'access_token',
        'refresh_token',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
