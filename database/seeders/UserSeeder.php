<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Admin User',
                'username' => 'admin',
                'password' => bcrypt('1234'),
                'role' => 'admin',
            ],
            [
                'name' => 'Waiter User',
                'username' => 'waiter',
                'password' => bcrypt('1234'),
                'role' => 'waiter',
            ],
            [
                'name' => 'Guest User',
                'username' => 'guest',
                'password' => bcrypt('1234'),
                'role' => 'guest',
            ],
        ]);
    }
}
