<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    public function menuItem()
    {
        $categories = MenuCategory::all();
        $menuItems = MenuItem::with('menuCategory')
            ->get()
            ->each(function ($item) {
                $item->image = $item->image
                    ? Storage::url($item->image)
                    : null;
            });

        return Inertia::render("Admin/MenuManagement/Items/MenuItems", [
            'categories' => $categories,
            'menuItems' => $menuItems,
            'selectedMenuItem' => request('selectedMenuItem'),
        ]);
    }

    public function menuItemCreate(Request $request)
    {
        $request->validate([
            'itemName' => ['required', 'string', 'max:255'],
            'categoryId' => ['required', 'exists:menu_categories,id'],
            'price' => ['required', 'numeric', 'min:0'],
            'ingredients' => ['nullable', 'array'],
            'ingredients.*' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('menu-items', 'public');
        }

        $menuItem = new MenuItem();

        $menuItem->menu_item = $request->itemName;
        $menuItem->category_id = $request->categoryId;
        $menuItem->price = $request->price;
        $menuItem->ingredients = $request->ingredients;
        $menuItem->description = $request->description;
        $menuItem->image = $imagePath;

        $menuItem->save();

        return back();
    }

    public function menuItemUpdate(Request $request, $itemId)
    {
        $menuItem = MenuItem::findOrFail($itemId);

        $request->validate([
            'itemName' => ['required', 'string', 'max:255'],
            'categoryId' => ['required', 'exists:menu_categories,id'],
            'price' => ['required', 'numeric', 'min:0'],
            'ingredients' => ['nullable', 'array'],
            'ingredients.*' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            if ($menuItem->image && Storage::disk('public')->exists($menuItem->image)) {
                Storage::disk('public')->delete($menuItem->image);
            }

            $imagePath = $request->file('image')
                ->store('menu-items', 'public');

            $menuItem->image = $imagePath;
        }

        $menuItem->menu_item = $request->itemName;
        $menuItem->category_id = $request->categoryId;
        $menuItem->price = $request->price;
        $menuItem->ingredients = $request->ingredients;
        $menuItem->description = $request->description;

        $menuItem->save();

        return back();
    }

    public function menuItemDelete($itemId)
    {
        $menuItem = MenuItem::findOrFail($itemId);

        if ($menuItem->image && Storage::disk('public')->exists($menuItem->image)) {
            Storage::disk('public')->delete($menuItem->image);
        }

        $menuItem->delete();

        return back();
    }
}
