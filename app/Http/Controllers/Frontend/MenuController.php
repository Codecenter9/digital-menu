<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MenuController extends Controller
{
    public function menu()
    {
        $menuItems = MenuItem::with('menuCategory')
            ->get()
            ->each(function ($item) {
                $item->image = $item->image
                    ? Storage::url($item->image)
                    : null;
            });


        $categories = $menuItems
            ->pluck('menuCategory')
            ->filter()
            ->unique('id')
            ->values();

        return Inertia::render('Frontend/Menu/Menu', [
            'menuItems' => $menuItems,
            'categories' => $categories,
        ]);
    }

    public function itemDetails($itemId)
    {
        $menuItem = MenuItem::with('menuCategory')->findOrFail($itemId);

        $menuItem->image = $menuItem->image
            ? Storage::url($menuItem->image)
            : null;

        return Inertia::render('Frontend/Menu/ItemDetail', [
            'menuItem' => $menuItem,
        ]);
    }

    public function checkOut()
    {
        return Inertia::render('Frontend/Menu/CheckOut');
    }

    public function storeOrders(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'tableNumber' => ['nullable', 'integer'],
            'totalAmount' => ['required', 'numeric'],
            'totalItems'  => ['required', 'integer'],
            'extra'       => ['nullable', 'string'],

            'items' => ['required', 'array', 'min:1'],
            'items.*.itemId' => ['required', 'exists:menu_items,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.unitPrice' => ['required', 'numeric'],
            'items.*.subtotal' => ['required', 'numeric'],
        ]);

        do {
            $orderNumber = rand(1000, 9999);
        } while (Order::where('order_number', $orderNumber)->exists());

        $order = new Order();

        $order->order_number = $orderNumber;
        $order->customer_id = $user->id;
        $order->table_number = $request->tableNumber;
        $order->total_items = $request->totalItems;
        $order->total_amount = $request->totalAmount;
        $order->extra = $request->extra;

        $order->save();

        foreach ($request->items as $item) {

            $orderItem = new OrderItem();

            $orderItem->order_id = $order->id;
            $orderItem->item_id = $item['itemId'];
            $orderItem->quantity = $item['quantity'];
            $orderItem->unit_price = $item['unitPrice'];
            $orderItem->subtotal = $item['subtotal'];

            $orderItem->save();
        }

        return back()->with('success', 'Order placed successfully.');
    }

    public function myOrders($userId)
    {
        $orders = Order::with([
            'orderItems.menuItem.menuCategory'
        ])
            ->where('customer_id', $userId)
            ->where("order_status", "!=", "completed")
            ->latest()
            ->get();

        $orders->each(function ($order) {
            $order->orderItems->each(function ($item) {
                if ($item->menuItem) {
                    $item->menuItem->image = $item->menuItem->image
                        ? Storage::url($item->menuItem->image)
                        : null;
                }
            });
        });


        return Inertia::render('Frontend/Menu/MyOrders', [
            'orders' => $orders,
        ]);
    }
}
