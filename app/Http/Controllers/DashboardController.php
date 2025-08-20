<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Violation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with violation monitoring statistics.
     */
    public function index(Request $request)
    {
        // Basic statistics
        $totalStudents = Student::count();
        $totalViolations = Violation::count();
        $pendingViolations = Violation::where('status', 'pending')->count();
        $todayViolations = Violation::whereDate('violation_date', today())->count();

        // Violation types breakdown
        $violationTypesCounts = DB::table('violations')
            ->select('violation_type', DB::raw('COUNT(*) as total'))
            ->groupBy('violation_type')
            ->get();
        
        $violationsByType = collect();
        $labels = [
            'lateness' => 'Keterlambatan',
            'uniform_violations' => 'Pelanggaran Seragam',
            'academic_dishonesty' => 'Ketidakjujuran Akademik',
            'disruptive_behavior' => 'Perilaku Mengganggu',
        ];
        
        foreach ($violationTypesCounts as $item) {
            $violationsByType->put(
                $labels[$item->violation_type] ?? $item->violation_type,
                $item->total
            );
        }

        // Recent violations
        $recentViolations = Violation::with('student')
            ->latest('violation_date')
            ->limit(10)
            ->get();

        // Top violation classes
        $topViolationClasses = DB::table('violations')
            ->select('student_class', DB::raw('COUNT(*) as total'))
            ->groupBy('student_class')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalStudents' => $totalStudents,
                'totalViolations' => $totalViolations,
                'pendingViolations' => $pendingViolations,
                'todayViolations' => $todayViolations,
            ],
            'violationsByType' => $violationsByType,
            'recentViolations' => $recentViolations,
            'topViolationClasses' => $topViolationClasses,
        ]);
    }
}