<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\GuestManagementController;
use App\Http\Controllers\Admin\MenuCategoryController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\OrderManagementController;
use App\Http\Controllers\Admin\PaymentManagementController;
use App\Http\Controllers\Admin\StaffManagementController;
use App\Http\Controllers\Frontend\HomePageController;
use App\Http\Controllers\Frontend\MenuController;
use App\Http\Controllers\Guest\GuestDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Sample\FileController;
use App\Http\Controllers\Sample\GoogleDriveController;
use App\Http\Controllers\Waiter\WaiterDashboardController;
use App\Http\Controllers\Waiter\WaiterMenuManagementController;
use App\Http\Controllers\Waiter\WaiterOrderManagementController;
use App\Http\Controllers\Waiter\WaiterPaymentManagementController;
use Illuminate\Support\Facades\Route;


Route::get("/", [HomePageController::class, "index"])->name("home");
Route::get("/menu", [MenuController::class, "menu"])->name("menu");
Route::get("/item-details/{itemId}", [MenuController::class, "itemDetails"])->name("item.details");
Route::get("/check-out", [MenuController::class, "checkOut"])->middleware(['auth'])->name("checkout");
Route::post("/orders/store", [MenuController::class, "storeOrders"])->middleware(['auth'])->name("orders.store");
Route::get("/my-orders/{userId}", [MenuController::class, "myOrders"])->middleware(['auth'])->name("myorders");

//admin routes
Route::prefix('admin')
    ->middleware(['auth', 'verified', 'role:admin'])
    ->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'adminDashboard'])
            ->name('admin.dashboard');

        Route::get('/staff-management', [StaffManagementController::class, 'staffManagement'])
            ->name('admin.staff-management');
        Route::post('/staff/create', [StaffManagementController::class, 'staffCreate'])->name('staff.store');
        Route::put('/staff/update/{staffId}', [StaffManagementController::class, 'staffUpdate'])->name('staff.update');
        Route::patch('/staff/status-update/{staffId}', [StaffManagementController::class, 'staffInActive'])->name('staff.status-update');
        Route::delete('/staff/delete/{staffId}', [StaffManagementController::class, 'staffDelete'])->name('staff.delete');

        Route::get('/guest-management', [GuestManagementController::class, 'guestManagement'])
            ->name('admin.guest-management');

        Route::get('/menu-categories', [MenuCategoryController::class, 'menuCategory'])->name('admin.menu-category');
        Route::post('/menu-categories/create', [MenuCategoryController::class, 'menuCategoryCreate'])->name('menu-categories.store');
        Route::put('/menu-categories/update/{categoryId}', [MenuCategoryController::class, 'menuCategoryUpdate'])->name('menu-categories.update');
        Route::delete('/menu-categories/delete/{categoryId}', [MenuCategoryController::class, 'menuCategoryDelete'])->name('menu-categories.delete');

        Route::get('/menu-items', [MenuItemController::class, 'menuItem'])->name('admin.menu-item');
        Route::post('/menu-items/create', [MenuItemController::class, 'menuItemCreate'])->name('menu-items.store');
        Route::post('/menu-items/update/{itemId}', [MenuItemController::class, 'menuItemUpdate'])->name('menu-items.update');
        Route::delete('/menu-items/delete/{itemId}', [MenuItemController::class, 'menuItemDelete'])->name('menu-items.delete');

        Route::get('/order-management', [OrderManagementController::class, 'orderManagement'])->name('admin.order-management');

        Route::get('/payment-management', [PaymentManagementController::class, 'paymentManagement'])->name('admin.payment-management');
    });


//guest routes
Route::prefix('guest')
    ->middleware(['auth', 'verified', 'role:guest'])
    ->group(function () {
        Route::get('/dashboard', [GuestDashboardController::class, 'guestDashboard'])
            ->name('guest.dashboard');

        Route::get('/guest-management', [GuestManagementController::class, 'guestManagement'])
            ->name('guest.management');

        //sample routes
        Route::get(
            '/files/upload',
            [FileController::class, 'index']
        )->name('index.upload');

        Route::post(
            '/files/upload/{user}',
            [FileController::class, 'upload']
        )->name('files.upload');
    });


//waiter routes
Route::prefix('waiter')
    ->middleware(['auth', 'verified', 'role:waiter'])
    ->group(function () {
        Route::get('/dashboard', [WaiterDashboardController::class, 'waiterDashboard'])
            ->name('waiter.dashboard');

        Route::get('/orders', [WaiterOrderManagementController::class, 'manageOrder'])
            ->name('waiter.orders');
        Route::patch('/orders/{order}/status', [WaiterOrderManagementController::class, 'updateOrderStatus'])
            ->name('waiter.orders.update-status');
        Route::delete('/orders/{orderId}', [WaiterOrderManagementController::class, 'deleteOrder'])
            ->name('waiter.orders.destroy');

        Route::get('/payments', [WaiterPaymentManagementController::class, 'managePayments'])
            ->name('waiter.payments');
        Route::patch('/orders/{order}/payment-status', [WaiterPaymentManagementController::class, 'updatePaymentStatus'])
            ->name('waiter.update-payment-status');
        Route::get('/menu-items', [WaiterMenuManagementController::class, 'manageMenuItems'])
            ->name('waiter.menu-management');
        Route::patch('/menu-items/{item}/item-status', [WaiterMenuManagementController::class, 'updateMenuItemStatus'])
            ->name('waiter.update-menu-item-status');
    });


// sample routes

Route::middleware(['auth'])->group(function () {

    Route::get(
        '/auth/google/callback',
        [GoogleDriveController::class, 'callback']
    )->name('auth.google.callback');


    Route::get(
        '/auth/google/{user}',
        [GoogleDriveController::class, 'redirect']
    )->name('auth.google');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
