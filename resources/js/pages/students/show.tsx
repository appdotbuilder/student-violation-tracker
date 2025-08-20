import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Student {
    id: number;
    name: string;
    student_id: string;
    class: string;
    violations?: Array<{
        id: number;
        violation_date: string;
        violation_type: string;
        description: string;
        disciplinary_action: string;
        reporting_staff: string;
        status: string;
    }>;
}

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function ShowStudent({ student }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Data Siswa',
            href: '/students',
        },
        {
            title: student.name,
            href: `/students/${student.id}`,
        },
    ];

    const getViolationIcon = (type: string) => {
        const icons = {
            lateness: '⏰',
            uniform_violations: '👔',
            academic_dishonesty: '📝',
            disruptive_behavior: '😤',
        };
        return icons[type as keyof typeof icons] || '📋';
    };

    const getViolationLabel = (type: string) => {
        const labels = {
            lateness: 'Keterlambatan',
            uniform_violations: 'Pelanggaran Seragam',
            academic_dishonesty: 'Ketidakjujuran Akademik',
            disruptive_behavior: 'Perilaku Mengganggu',
        };
        return labels[type as keyof typeof labels] || type;
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            resolved: 'bg-green-100 text-green-800',
            escalated: 'bg-red-100 text-red-800',
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title={`Detail Siswa - ${student.name}`} />
            
            <div className="space-y-6">
                {/* Student Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">👤 Detail Siswa</h1>
                        <p className="text-gray-600">Informasi lengkap dan riwayat pelanggaran</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/students/${student.id}/edit`}>
                            <Button>✏️ Edit Data</Button>
                        </Link>
                        <Link href="/violations/create">
                            <Button variant="outline">➕ Tambah Pelanggaran</Button>
                        </Link>
                    </div>
                </div>

                {/* Student Information */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
                            <p className="mt-1 text-lg font-semibold text-gray-900">{student.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">NIS</label>
                            <p className="mt-1 text-lg font-semibold text-gray-900">{student.student_id}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Kelas</label>
                            <p className="mt-1">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {student.class}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow border text-center">
                        <div className="text-2xl font-bold text-blue-600">{student.violations?.length || 0}</div>
                        <div className="text-sm text-gray-600">Total Pelanggaran</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {student.violations?.filter(v => v.status === 'pending').length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {student.violations?.filter(v => v.status === 'resolved').length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Selesai</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {student.violations?.filter(v => v.status === 'escalated').length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Escalasi</div>
                    </div>
                </div>

                {/* Violations History */}
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">📋 Riwayat Pelanggaran</h2>
                    </div>
                    
                    {student.violations && student.violations.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelapor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {student.violations.map((violation) => (
                                        <tr key={violation.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                                {new Date(violation.violation_date).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{getViolationIcon(violation.violation_type)}</span>
                                                    <span className="text-sm text-gray-900">
                                                        {getViolationLabel(violation.violation_type)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-xs">
                                                <p className="truncate" title={violation.description}>
                                                    {violation.description}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-xs">
                                                <p className="truncate" title={violation.disciplinary_action}>
                                                    {violation.disciplinary_action}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">
                                                {violation.reporting_staff}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(violation.status)}`}>
                                                    {violation.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link href={`/violations/${violation.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        👁️ Detail
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">✅</div>
                            <p>Siswa ini belum memiliki riwayat pelanggaran</p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}