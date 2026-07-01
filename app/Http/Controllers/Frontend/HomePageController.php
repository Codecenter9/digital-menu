<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index()
    {
        $menuItems = MenuItem::with('menuCategory')
            ->get()
            ->each(function ($item) {
                $item->image = $item->image
                    ? Storage::url($item->image)
                    : null;
            });

        return Inertia::render("Frontend/Home/Home", compact("menuItems"));
    }
}
