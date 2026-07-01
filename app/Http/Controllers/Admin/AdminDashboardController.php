<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function adminDashboard()
    {
        $orders = Order::with([
            'payment',
            'orderItems.menuItem.menuCategory',
        ])->where('order_status', 'completed')->get();
        return Inertia::render('Admin/Dashboard/AdminDashboard', ['orders' => $orders]);
    }
}
