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
        Schema::create('violations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->string('student_name');
            $table->string('student_class');
            $table->date('violation_date');
            $table->enum('violation_type', ['lateness', 'uniform_violations', 'academic_dishonesty', 'disruptive_behavior']);
            $table->text('description');
            $table->string('disciplinary_action');
            $table->string('reporting_staff');
            $table->enum('status', ['pending', 'resolved', 'escalated'])->default('pending');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('student_name');
            $table->index('student_class');
            $table->index('violation_date');
            $table->index('violation_type');
            $table->index('status');
            $table->index(['violation_date', 'violation_type']);
            $table->index(['student_name', 'violation_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('violations');
    }
};