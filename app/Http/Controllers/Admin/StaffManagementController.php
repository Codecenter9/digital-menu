<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StaffManagementController extends Controller
{
    public function staffManagement()
    {
        $staffMembers = User::whereIn('role', ['waiter', 'admin'])->get();
        return Inertia::render('Admin/StaffManagement/StaffManagement', compact("staffMembers"));
    }

    public function staffCreate(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|lowercase|unique:users,username',
            'role' => 'required|in:admin,waiter,guest',
        ]);

        $staff = new User();
        $staff->name = $request->name;
        $staff->username = $request->username;
        $staff->role = $request->role;
        $staff->password = bcrypt("1234");
        $staff->save();

        return back();
    }

    public function staffUpdate(Request $request, $staffId)
    {
        $staff = User::findOrFail($staffId);
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|lowercase|unique:users,username,' . $staff->id,
            'role' => 'required|in:admin,waiter,guest',
        ]);

        $staff->name = $request->name;
        $staff->username = $request->username;
        $staff->role = $request->role;
        $staff->password = bcrypt("1234");
        $staff->save();

        return back();
    }

    public function staffInActive($staffId)
    {
        $staff = User::findOrFail($staffId);

        $staff->is_active = $staff->is_active == 1 ? 0 : 1;

        $staff->save();

        return back();
    }
    public function staffDelete($staffId)
    {
        $staff = User::findOrFail($staffId);

        if ($staff->image && Storage::disk('public')->exists($staff->image)) {
            Storage::disk('public')->delete($staff->image);
        }

        $staff->delete();

        return back();
    }
}
