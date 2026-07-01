<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentManagementController extends Controller
{
    public function paymentManagement()
    {
         $payments = Payment::with("order")->latest()->get();
        return Inertia::render("Admin/Payments/Payments",['payments'=>$payments]);
    }
}
