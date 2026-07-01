<?php

namespace App\Http\Controllers\Waiter;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WaiterPaymentManagementController extends Controller
{

    public function managePayments()
    {
        $payments = Payment::with("order")->latest()->get();

        return Inertia::render("Waiter/PaymentManagement/PaymentManagement", ['payments' => $payments]);
    }

    public function updatePaymentStatus(Request $request, Order $order)
    {
        $request->validate([
            'paymentMethod' => 'required|in:cash,cbe,telebirr',
            'paidAmount' => 'required|numeric|min:0',
            'paymentStatus' => 'required|in:pending,paid',
        ]);

        $order->payment()->updateOrCreate(
            [
                'order_id' => $order->id,
            ],
            [
                'payment_method' => $request->paymentMethod,
                'amount' => $request->paidAmount,
                'payment_status' => $request->paymentStatus,
                'paid_at' => $request->paymentStatus === 'paid'
                    ? now()
                    : null,
            ]
        );

        return back();
    }
}
