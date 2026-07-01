<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class GuestDashboardController extends Controller
{
    public function guestDashboard()
    {
        $users = User::with('storageAccounts')->get();

        $users->transform(function ($user) {

            $user->google_connected = $user->storageAccounts()
                ->where('provider', 'google')
                ->exists();

            $user->google_email = $user->storageAccounts()
                ->where('provider', 'google')
                ->value('email');

            return $user;
        });

        return Inertia::render(
            'Guest/Dashboard/GuestDashboard',
            compact('users')
        );
    }
}
