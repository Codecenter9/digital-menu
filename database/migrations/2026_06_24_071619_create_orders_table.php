<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->string('order_number')->unique();

            $table->foreignId('customer_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('waiter_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->integer('table_number')->nullable();
            $table->integer('total_items')->default(1);
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->longText('extra')->nullable();

            $table->enum('order_status', [
                'pending',
                'preparing',
                'completed',
            ])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
