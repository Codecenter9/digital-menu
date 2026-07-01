<?php

namespace App\Http\Controllers\Sample;

use App\Http\Controllers\Controller;
use App\Models\StorageAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleDriveController extends Controller
{
    public function redirect(User $user)
{
    session([
        'google_connect_user_id' => $user->id
    ]);

    Log::info('Google redirect started', [
        'user_id' => $user->id
    ]);

    return Socialite::driver('google')
        ->scopes([
            'https://www.googleapis.com/auth/drive.file'
        ])
        ->with(['prompt' => 'consent'])
        ->redirect();
}

 public function callback(Request $request)
{
    try {

        Log::info('Google callback hit', $request->all());

        if ($request->has('error')) {
            Log::warning('Google OAuth cancelled', $request->all());

            return redirect()->route('guest.dashboard')
                ->with('toast', [
                    'type' => 'error',
                    'message' => 'Google connection cancelled.'
                ]);
        }

        // 🔥 IMPORTANT FIX
        $userId = session('google_connect_user_id');

        Log::info('Session user loaded', [
            'user_id' => $userId
        ]);

        if (!$userId) {
            Log::error('Session missing user_id');

            return redirect()->route('guest.dashboard')
                ->with('toast', [
                    'type' => 'error',
                    'message' => 'Session expired. Please try again.'
                ]);
        }

        $googleUser = Socialite::driver('google')->user();

        Log::info('Google user received', [
            'email' => $googleUser->email
        ]);

        $saved = StorageAccount::updateOrCreate(
            [
                'user_id' => $userId,
                'provider' => 'google',
            ],
            [
                'email' => $googleUser->email,
                'access_token' => encrypt($googleUser->token),
                'refresh_token' => encrypt($googleUser->refreshToken),
            ]
        );

        Log::info('DB SAVE RESULT', [
            'saved' => $saved
        ]);

        return redirect()->route('guest.dashboard')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Google Drive connected successfully!'
            ]);

    } catch (\Exception $e) {

        Log::error('OAuth FAILED', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return redirect()->route('guest.dashboard')
            ->with('toast', [
                'type' => 'error',
                'message' => 'Google connection failed: ' . $e->getMessage()
            ]);
    }
}
}
