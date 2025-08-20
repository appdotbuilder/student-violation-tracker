<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Violation
 *
 * @property int $id
 * @property int $student_id
 * @property string $student_name
 * @property string $student_class
 * @property string $violation_date
 * @property string $violation_type
 * @property string $description
 * @property string $disciplinary_action
 * @property string $reporting_staff
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Student $student
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Violation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Violation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Violation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereDisciplinaryAction($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereReportingStaff($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereStudentClass($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereStudentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereViolationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation whereViolationType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Violation pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Violation resolved()
 * @method static \Database\Factories\ViolationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Violation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'student_name',
        'student_class',
        'violation_date',
        'violation_type',
        'description',
        'disciplinary_action',
        'reporting_staff',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'violation_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that owns the violation.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Scope a query to only include pending violations.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include resolved violations.
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    /**
     * Get violation type label.
     */
    public function getViolationTypeLabel(): string
    {
        return match($this->violation_type) {
            'lateness' => 'Keterlambatan',
            'uniform_violations' => 'Pelanggaran Seragam',
            'academic_dishonesty' => 'Ketidakjujuran Akademik',
            'disruptive_behavior' => 'Perilaku Mengganggu',
            default => $this->violation_type,
        };
    }

    /**
     * Get status label.
     */
    public function getStatusLabel(): string
    {
        return match($this->status) {
            'pending' => 'Pending',
            'resolved' => 'Selesai',
            'escalated' => 'Diescalasi',
            default => $this->status,
        };
    }
}