<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreViolationRequest;
use App\Http\Requests\UpdateViolationRequest;
use App\Models\Student;
use App\Models\Violation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViolationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Violation::query()->with('student');

        // Search filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                  ->orWhere('student_class', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('reporting_staff', 'like', "%{$search}%");
            });
        }

        if ($request->filled('violation_type')) {
            $query->where('violation_type', $request->violation_type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('class')) {
            $query->where('student_class', $request->class);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('violation_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('violation_date', '<=', $request->date_to);
        }

        $violations = $query->latest('violation_date')->paginate(15)->withQueryString();
        
        // Get filter options
        $classes = Student::distinct()->orderBy('class')->pluck('class');
        $violationTypes = [
            'lateness' => 'Keterlambatan',
            'uniform_violations' => 'Pelanggaran Seragam',
            'academic_dishonesty' => 'Ketidakjujuran Akademik',
            'disruptive_behavior' => 'Perilaku Mengganggu',
        ];
        $statuses = [
            'pending' => 'Pending',
            'resolved' => 'Selesai',
            'escalated' => 'Diescalasi',
        ];

        return Inertia::render('violations/index', [
            'violations' => $violations,
            'classes' => $classes,
            'violationTypes' => $violationTypes,
            'statuses' => $statuses,
            'filters' => $request->only(['search', 'violation_type', 'status', 'class', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $students = Student::orderBy('name')->get();
        $violationTypes = [
            'lateness' => 'Keterlambatan',
            'uniform_violations' => 'Pelanggaran Seragam',
            'academic_dishonesty' => 'Ketidakjujuran Akademik',
            'disruptive_behavior' => 'Perilaku Mengganggu',
        ];

        return Inertia::render('violations/create', [
            'students' => $students,
            'violationTypes' => $violationTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreViolationRequest $request)
    {
        $violation = Violation::create($request->validated());

        return redirect()->route('violations.show', $violation)
            ->with('success', 'Laporan pelanggaran berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Violation $violation)
    {
        $violation->load('student');

        return Inertia::render('violations/show', [
            'violation' => $violation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Violation $violation)
    {
        $students = Student::orderBy('name')->get();
        $violationTypes = [
            'lateness' => 'Keterlambatan',
            'uniform_violations' => 'Pelanggaran Seragam',
            'academic_dishonesty' => 'Ketidakjujuran Akademik',
            'disruptive_behavior' => 'Perilaku Mengganggu',
        ];
        $statuses = [
            'pending' => 'Pending',
            'resolved' => 'Selesai',
            'escalated' => 'Diescalasi',
        ];

        $violation->load('student');

        return Inertia::render('violations/edit', [
            'violation' => $violation,
            'students' => $students,
            'violationTypes' => $violationTypes,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateViolationRequest $request, Violation $violation)
    {
        $violation->update($request->validated());

        return redirect()->route('violations.show', $violation)
            ->with('success', 'Laporan pelanggaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Violation $violation)
    {
        $violation->delete();

        return redirect()->route('violations.index')
            ->with('success', 'Laporan pelanggaran berhasil dihapus.');
    }
}