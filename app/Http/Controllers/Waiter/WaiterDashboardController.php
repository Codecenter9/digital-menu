<?php

namespace App\Http\Controllers\Waiter;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Order;

class WaiterDashboardController extends Controller
{
    public function waiterDashboard()
    {
        $orders = Order::with([
            'customer',
            'payment',
            'waiter',
            'orderItems.menuItem.menuCategory',
        ])->latest()->get();
        return Inertia::render("Waiter/Dashboard/WaiterDashboard", ['orders' => $orders]);
    }
}
