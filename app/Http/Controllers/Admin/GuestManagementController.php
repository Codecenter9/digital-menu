<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GuestManagementController extends Controller
{
    public function guestManagement()
    {
        return Inertia::render('Admin/GuestManagement/GuestManagement');
    }
}
