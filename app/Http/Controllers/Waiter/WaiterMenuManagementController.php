<?php

namespace App\Http\Controllers\Waiter;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WaiterMenuManagementController extends Controller
{
    public function manageMenuItems()
    {
        $menuItems = MenuItem::with('menuCategory')
            ->get()
            ->each(function ($item) {
                $item->image = $item->image
                    ? Storage::url($item->image)
                    : null;
            });
        return Inertia::render("Waiter/Menu/MenuManagement", ['menuItems' => $menuItems]);
    }

    public function updateMenuItemStatus($itemId)
    {
        $item = MenuItem::findOrFail($itemId);
        $item->is_available = $item->is_available == 1 ? 0 : 1;

        $item->save();

        return back();
    }
}
