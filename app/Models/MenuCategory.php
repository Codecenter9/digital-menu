<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuCategory extends Model
{
    protected $fillable = [
        'category_name',
        'is_drink',
    ];

    protected $casts = [
        'is_drink' => 'boolean',
    ];

    public function menuItem()
    {
        $this->hasMany(MenuItem::class);
    }
}
