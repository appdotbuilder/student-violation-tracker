<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Violation>
 */
class ViolationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $violationTypes = ['lateness', 'uniform_violations', 'academic_dishonesty', 'disruptive_behavior'];
        $statuses = ['pending', 'resolved', 'escalated'];
        
        $student = Student::factory()->create();
        
        $descriptions = [
            'lateness' => [
                'Terlambat masuk kelas pagi selama 15 menit',
                'Datang terlambat setelah istirahat',
                'Tidak hadir pada jam pertama tanpa keterangan',
            ],
            'uniform_violations' => [
                'Tidak memakai seragam lengkap',
                'Memakai aksesoris berlebihan',
                'Sepatu tidak sesuai ketentuan',
            ],
            'academic_dishonesty' => [
                'Menyontek saat ujian',
                'Meniru pekerjaan teman',
                'Tidak mengerjakan tugas sendiri',
            ],
            'disruptive_behavior' => [
                'Ribut di dalam kelas',
                'Mengganggu teman saat belajar',
                'Tidak mendengarkan penjelasan guru',
            ],
        ];

        $disciplinaryActions = [
            'Teguran lisan',
            'Teguran tertulis',
            'Pembinaan khusus',
            'Pemanggilan orang tua',
            'Skorsing 1 hari',
            'Bimbingan konseling',
        ];

        $teachers = [
            'Pak Ahmad Susanto, S.Pd',
            'Bu Siti Rahayu, M.Pd',
            'Pak Budi Hartono, S.Kom',
            'Bu Maya Sari, S.Pd',
            'Pak Dedi Kurniawan, S.T',
            'Bu Rina Wati, M.Pd',
        ];

        $violationType = fake()->randomElement($violationTypes);

        return [
            'student_id' => $student->id,
            'student_name' => $student->name,
            'student_class' => $student->class,
            'violation_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'violation_type' => $violationType,
            'description' => fake()->randomElement($descriptions[$violationType]),
            'disciplinary_action' => fake()->randomElement($disciplinaryActions),
            'reporting_staff' => fake()->randomElement($teachers),
            'status' => fake()->randomElement($statuses),
        ];
    }
}