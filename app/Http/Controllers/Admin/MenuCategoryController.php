<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuCategoryController extends Controller
{
    public function menuCategory()
    {
        $categories = MenuCategory::all();
        $menuItems = MenuItem::with('menuCategory')
            ->get()
            ->each(function ($item) {
                $item->image = $item->image
                    ? Storage::url($item->image)
                    : null;
            });

        return Inertia::render('Admin/MenuManagement/Categories/MenuCategory', [
            'categories' => $categories,
            'menuItems' => $menuItems
        ]);
    }

    public function menuCategoryCreate(Request $request)
    {
        $request->validate([
            'categoryName' => ['required', 'string', 'max:255'],
            'categoryType' => ['required', 'in:meal,drink'],
        ]);

        $category = new MenuCategory();

        $category->category_name = $request->categoryName;
        $category->is_drink = $request->categoryType === 'drink';

        $category->save();

        return back();
    }

    public function menuCategoryUpdate(Request $request, $categoryId)
    {
        $request->validate([
            'categoryName' => ['required', 'string', 'max:255'],
            'categoryType' => ['required', 'in:meal,drink'],
        ]);

        $category = MenuCategory::findOrFail($categoryId);

        $category->category_name = $request->categoryName;
        $category->is_drink = $request->categoryType === 'drink';

        $category->save();

        return back();
    }

    public function menuCategoryDelete($categoryId)
    {
        $category = MenuCategory::findOrFail($categoryId);

        $menuItems = MenuItem::where('category_id', $categoryId)->get();

        foreach ($menuItems as $item) {

            if ($item->image && Storage::disk('public')->exists($item->image)) {
                Storage::disk('public')->delete($item->image);
            }

            $item->delete();
        }

        $category->delete();

        return back();
    }
}
