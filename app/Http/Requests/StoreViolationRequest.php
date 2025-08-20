<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreViolationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,id',
            'student_name' => 'required|string|max:255',
            'student_class' => 'required|string|max:50',
            'violation_date' => 'required|date|before_or_equal:today',
            'violation_type' => 'required|in:lateness,uniform_violations,academic_dishonesty,disruptive_behavior',
            'description' => 'required|string|max:1000',
            'disciplinary_action' => 'required|string|max:500',
            'reporting_staff' => 'required|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'student_id.required' => 'Siswa wajib dipilih.',
            'student_id.exists' => 'Siswa tidak ditemukan.',
            'violation_date.required' => 'Tanggal pelanggaran wajib diisi.',
            'violation_date.before_or_equal' => 'Tanggal pelanggaran tidak boleh lebih dari hari ini.',
            'violation_type.required' => 'Jenis pelanggaran wajib dipilih.',
            'description.required' => 'Deskripsi pelanggaran wajib diisi.',
            'disciplinary_action.required' => 'Tindakan disiplin wajib diisi.',
            'reporting_staff.required' => 'Nama pelapor wajib diisi.',
        ];
    }
}