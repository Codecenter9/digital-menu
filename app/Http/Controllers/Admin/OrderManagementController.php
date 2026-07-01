<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderManagementController extends Controller
{
    public function orderManagement()
    {
        $orders = Order::with([
            'customer',
            'waiter',
            'payment',
            'orderItems.menuItem.menuCategory',
        ])
            ->latest()
            ->get();

        $orders->each(function ($order) {
            $order->orderItems->each(function ($item) {
                if ($item->menuItem && !str_starts_with($item->menuItem->image, '/storage/')) {
                    $item->menuItem->image = Storage::url($item->menuItem->image);
                }
            });
        });
        return Inertia::render('Admin/Orders/Orders', [
            'orders' => $orders,
            'refferedOrder' => request('refferedOrder'),
        ]);
    }
}
