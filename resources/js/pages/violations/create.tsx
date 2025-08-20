import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Student {
    id: number;
    name: string;
    student_id: string;
    class: string;
}

interface ViolationFormData {
    student_id: string;
    student_name: string;
    student_class: string;
    violation_date: string;
    violation_type: string;
    description: string;
    disciplinary_action: string;
    reporting_staff: string;
    [key: string]: string;
}

interface Props {
    students: Student[];
    violationTypes: Record<string, string>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pelanggaran',
        href: '/violations',
    },
    {
        title: 'Tambah Pelanggaran',
        href: '/violations/create',
    },
];

export default function CreateViolation({ students, violationTypes }: Props) {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);

    const { data, setData, post, processing, errors } = useForm<ViolationFormData>({
        student_id: '',
        student_name: '',
        student_class: '',
        violation_date: new Date().toISOString().split('T')[0],
        violation_type: '',
        description: '',
        disciplinary_action: '',
        reporting_staff: '',
    });

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStudentSelect = (student: Student) => {
        setSelectedStudent(student);
        setData({
            ...data,
            student_id: student.id.toString(),
            student_name: student.name,
            student_class: student.class,
        });
        setSearchTerm(student.name);
        setShowStudentDropdown(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/violations');
    };

    const getViolationIcon = (type: string) => {
        const icons = {
            lateness: '⏰',
            uniform_violations: '👔',
            academic_dishonesty: '📝',
            disruptive_behavior: '😤',
        };
        return icons[type as keyof typeof icons] || '📋';
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pelanggaran" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">➕ Tambah Pelanggaran Baru</h1>
                    <p className="text-gray-600">Catat pelanggaran siswa dengan detail lengkap</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Student Selection */}
                        <div className="border-b pb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">👤 Data Siswa</h2>
                            
                            <div className="relative">
                                <label htmlFor="student_search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Pilih Siswa <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="student_search"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setShowStudentDropdown(true);
                                    }}
                                    onFocus={() => setShowStudentDropdown(true)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Cari nama, NIS, atau kelas siswa..."
                                    autoComplete="off"
                                />
                                
                                {showStudentDropdown && filteredStudents.length > 0 && (
                                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {filteredStudents.map((student) => (
                                            <button
                                                key={student.id}
                                                type="button"
                                                onClick={() => handleStudentSelect(student)}
                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 focus:outline-none focus:bg-gray-50"
                                            >
                                                <div className="font-medium text-gray-900">{student.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    NIS: {student.student_id} • Kelas: {student.class}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {errors.student_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
                            )}

                            {selectedStudent && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-medium text-blue-900">Siswa Terpilih:</h3>
                                    <p className="text-blue-800">
                                        <strong>{selectedStudent.name}</strong> • NIS: {selectedStudent.student_id} • Kelas: {selectedStudent.class}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Violation Details */}
                        <div className="border-b pb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 Detail Pelanggaran</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="violation_date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Pelanggaran <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="violation_date"
                                        value={data.violation_date}
                                        onChange={(e) => setData('violation_date', e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.violation_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.violation_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="violation_type" className="block text-sm font-medium text-gray-700 mb-1">
                                        Jenis Pelanggaran <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="violation_type"
                                        value={data.violation_type}
                                        onChange={(e) => setData('violation_type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Jenis Pelanggaran</option>
                                        {Object.entries(violationTypes).map(([key, label]) => (
                                            <option key={key} value={key}>
                                                {getViolationIcon(key)} {label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.violation_type && (
                                        <p className="mt-1 text-sm text-red-600">{errors.violation_type}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi Pelanggaran <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Jelaskan secara detail pelanggaran yang dilakukan siswa..."
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Action and Reporter */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Tindakan & Pelapor</h2>
                            
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="disciplinary_action" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tindakan Disiplin <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="disciplinary_action"
                                        value={data.disciplinary_action}
                                        onChange={(e) => setData('disciplinary_action', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Contoh: Teguran lisan, Pembinaan khusus, Pemanggilan orang tua..."
                                        required
                                    />
                                    {errors.disciplinary_action && (
                                        <p className="mt-1 text-sm text-red-600">{errors.disciplinary_action}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="reporting_staff" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Pelapor (Guru/Staff) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="reporting_staff"
                                        value={data.reporting_staff}
                                        onChange={(e) => setData('reporting_staff', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Contoh: Pak Ahmad Susanto, S.Pd"
                                        required
                                    />
                                    {errors.reporting_staff && (
                                        <p className="mt-1 text-sm text-red-600">{errors.reporting_staff}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    ❌ Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || !selectedStudent}
                                    className="min-w-[120px]"
                                >
                                    {processing ? '⏳ Menyimpan...' : '💾 Simpan Pelanggaran'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}