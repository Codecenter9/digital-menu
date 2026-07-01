<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'user_id',
        'storage_account_id',
        'google_file_id',
        'name',
        'mime_type',
        'size',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function storageAccount()
    {
        return $this->belongsTo(StorageAccount::class);
    }
}
