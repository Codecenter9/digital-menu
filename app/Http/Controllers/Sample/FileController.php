<?php

namespace App\Http\Controllers\Sample;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\StorageAccount;
use Illuminate\Http\Request;
use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Sample/uploadfile',  compact('user'));
    }
    public function upload(Request $request, User $user)
    {
        try {

            $request->validate([
                'file' => ['required', 'file', 'max:10240']
            ]);

            $storage = StorageAccount::where('user_id', $user->id)
                ->where('provider', 'google')
                ->first();

            if (!$storage) {

                return back()->with('toast', [
                    'type' => 'error',
                    'message' => 'Google Drive not connected.'
                ]);
            }

            $client = new Client();

            $client->setAccessToken([
                'access_token' => decrypt($storage->access_token),
                'refresh_token' => decrypt($storage->refresh_token)
            ]);

            $drive = new Drive($client);

            $uploadedFile = $request->file('file');

            $fileMetadata = new DriveFile([
                'name' => $uploadedFile->getClientOriginalName()
            ]);

            $googleFile = $drive->files->create(
                $fileMetadata,
                [
                    'data' => file_get_contents($uploadedFile->getRealPath()),
                    'mimeType' => $uploadedFile->getMimeType(),
                    'uploadType' => 'multipart',
                    'fields' => 'id,name'
                ]
            );

            File::create([
                'user_id' => $user->id,
                'storage_account_id' => $storage->id,
                'google_file_id' => $googleFile->id,
                'name' => $uploadedFile->getClientOriginalName(),
                'mime_type' => $uploadedFile->getMimeType(),
                'size' => $uploadedFile->getSize(),
            ]);

            Log::info('File uploaded', [
                'user_id' => $user->id,
                'file_id' => $googleFile->id
            ]);

            return back()->with('toast', [
                'type' => 'success',
                'message' => 'File uploaded successfully.'
            ]);
        } catch (\Exception $e) {

            Log::error('Upload failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return back()->with('toast', [
                'type' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
