<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use App\Models\Violation;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin SMK',
            'email' => 'admin@smk.edu',
        ]);

        // Create sample teacher user
        User::factory()->create([
            'name' => 'Guru Piket',
            'email' => 'guru@smk.edu',
        ]);

        // Create students
        $students = Student::factory(50)->create();

        // Create violations for existing students
        $students->each(function ($student) {
            Violation::factory(random_int(0, 5))->create([
                'student_id' => $student->id,
                'student_name' => $student->name,
                'student_class' => $student->class,
            ]);
        });
    }
}