<?php

namespace App\Http\Controllers\Waiter;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class WaiterOrderManagementController extends Controller
{
    public function manageOrder()
    {
        $orders = Order::with([
            'customer',
            'payment',
            'waiter',
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


        return Inertia::render("Waiter/OrderManagement/OrderManagement", ['orders' => $orders, 'refferedOrder' => request('refferedOrder')]);
    }

    public function updateOrderStatus(Request $request, Order $order)
    {
        $user = Auth::user();
        $request->validate([
            'order_status' => 'required|in:pending,preparing,completed',
        ]);

        $order->update([
            'order_status' => $request->order_status,
            'waiter_id' => $user->id,
        ]);

        $order->updateOrCreate([
            'waiter_id' => $user->id,
        ]);

        return back();
    }

    public function deleteOrder($orderId)
    {
        $order = Order::findOrFail($orderId);

        OrderItem::where('order_id', $orderId)->delete();

        $order->delete();

        return back();
    }
}
