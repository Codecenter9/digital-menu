<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'category_id',
        'menu_item',
        'price',
        'description',
        'ingredients',
        'image',
        'is_available',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'is_available' => 'boolean',
    ];


    public function menuCategory()
    {
        return $this->belongsTo(MenuCategory::class, 'category_id');
    }
}
