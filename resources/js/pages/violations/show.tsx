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
}

interface Violation {
    id: number;
    student_name: string;
    student_class: string;
    violation_date: string;
    violation_type: string;
    description: string;
    disciplinary_action: string;
    reporting_staff: string;
    status: string;
    student?: Student;
}

interface Props {
    violation: Violation;
    [key: string]: unknown;
}

export default function ShowViolation({ violation }: Props) {
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
            title: `Pelanggaran #${violation.id}`,
            href: `/violations/${violation.id}`,
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

    const getStatusLabel = (status: string) => {
        const labels = {
            pending: 'Pending',
            resolved: 'Selesai',
            escalated: 'Diescalasi',
        };
        return labels[status as keyof typeof labels] || status;
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pelanggaran #${violation.id}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Detail Pelanggaran</h1>
                        <p className="text-gray-600">Informasi lengkap pelanggaran siswa</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/violations/${violation.id}/edit`}>
                            <Button>✏️ Edit Pelanggaran</Button>
                        </Link>
                        {violation.student && (
                            <Link href={`/students/${violation.student.id}`}>
                                <Button variant="outline">👤 Lihat Profil Siswa</Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">ℹ️ Informasi Dasar</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tanggal Pelanggaran</label>
                                    <p className="mt-1 text-gray-900 font-semibold">
                                        {new Date(violation.violation_date).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Jenis Pelanggaran</label>
                                    <p className="mt-1 flex items-center">
                                        <span className="mr-2 text-xl">{getViolationIcon(violation.violation_type)}</span>
                                        <span className="font-semibold text-gray-900">{getViolationLabel(violation.violation_type)}</span>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Status</label>
                                    <p className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(violation.status)}`}>
                                            {getStatusLabel(violation.status)}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pelapor</label>
                                    <p className="mt-1 text-gray-900 font-semibold">{violation.reporting_staff}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Deskripsi Pelanggaran</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-800 leading-relaxed">{violation.description}</p>
                            </div>
                        </div>

                        {/* Disciplinary Action */}
                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Tindakan Disiplin</h2>
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                <p className="text-gray-800 leading-relaxed">{violation.disciplinary_action}</p>
                            </div>
                        </div>
                    </div>

                    {/* Student Information Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">👤 Data Siswa</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</label>
                                    <p className="mt-1 text-gray-900 font-semibold">{violation.student_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Kelas</label>
                                    <p className="mt-1">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {violation.student_class}
                                        </span>
                                    </p>
                                </div>
                                {violation.student && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">NIS</label>
                                        <p className="mt-1 text-gray-900 font-semibold">{violation.student.student_id}</p>
                                    </div>
                                )}
                            </div>
                            
                            {violation.student && (
                                <div className="mt-6 pt-4 border-t">
                                    <Link href={`/students/${violation.student.id}`}>
                                        <Button className="w-full" variant="outline">
                                            👁️ Lihat Profil Lengkap
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white p-6 rounded-lg shadow border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Aksi Cepat</h2>
                            <div className="space-y-3">
                                <Link href={`/violations/${violation.id}/edit`}>
                                    <Button className="w-full" variant="outline">
                                        ✏️ Edit Pelanggaran
                                    </Button>
                                </Link>
                                <Link href="/violations/create">
                                    <Button className="w-full" variant="outline">
                                        ➕ Tambah Pelanggaran Baru
                                    </Button>
                                </Link>
                                <Link href="/violations">
                                    <Button className="w-full" variant="outline">
                                        📋 Kembali ke Daftar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}