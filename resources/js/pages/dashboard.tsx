import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Props {
    stats: {
        totalStudents: number;
        totalViolations: number;
        pendingViolations: number;
        todayViolations: number;
    };
    violationsByType: Record<string, number>;
    recentViolations: Array<{
        id: number;
        student_name: string;
        student_class: string;
        violation_type: string;
        violation_date: string;
        status: string;
    }>;

    topViolationClasses: Array<{
        student_class: string;
        total: number;
    }>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, violationsByType, recentViolations, topViolationClasses }: Props) {
    const violationTypeLabels: Record<string, { label: string; icon: string; color: string }> = {
        lateness: { label: 'Keterlambatan', icon: '⏰', color: 'bg-red-100 text-red-800' },
        uniform_violations: { label: 'Pelanggaran Seragam', icon: '👔', color: 'bg-blue-100 text-blue-800' },
        academic_dishonesty: { label: 'Ketidakjujuran Akademik', icon: '📝', color: 'bg-orange-100 text-orange-800' },
        disruptive_behavior: { label: 'Perilaku Mengganggu', icon: '😤', color: 'bg-purple-100 text-purple-800' },
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
            <Head title="Dashboard - Monitoring Pelanggaran Siswa" />
            
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">🏫 Dashboard Monitoring Pelanggaran Siswa</h1>
                    <p className="text-blue-100">Selamat datang di sistem monitoring pelanggaran siswa SMK</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border">
                        <div className="flex items-center">
                            <div className="bg-red-100 p-3 rounded-lg mr-4">
                                <span className="text-2xl">📋</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Pelanggaran</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalViolations}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border">
                        <div className="flex items-center">
                            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pendingViolations}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-lg mr-4">
                                <span className="text-2xl">📅</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Hari Ini</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.todayViolations}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Aksi Cepat</h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/violations/create">
                            <Button className="bg-red-600 hover:bg-red-700">
                                ➕ Tambah Pelanggaran
                            </Button>
                        </Link>
                        <Link href="/students/create">
                            <Button variant="outline">
                                👤 Tambah Siswa
                            </Button>
                        </Link>
                        <Link href="/violations">
                            <Button variant="outline">
                                📋 Lihat Semua Pelanggaran
                            </Button>
                        </Link>
                        <Link href="/students">
                            <Button variant="outline">
                                👥 Kelola Siswa
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Violations by Type */}
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Pelanggaran Berdasarkan Jenis</h2>
                        <div className="space-y-3">
                            {Object.entries(violationsByType).map(([type, count]) => {
                                const typeKey = Object.keys(violationTypeLabels).find(key => 
                                    violationTypeLabels[key].label === type
                                ) || 'lateness';
                                const typeInfo = violationTypeLabels[typeKey];
                                
                                return (
                                    <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <span className="text-xl mr-3">{typeInfo.icon}</span>
                                            <span className="font-medium text-gray-800">{type}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${typeInfo.color}`}>
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Top Violation Classes */}
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">🎓 Top Kelas dengan Pelanggaran</h2>
                        <div className="space-y-3">
                            {topViolationClasses.map((item, index) => (
                                <div key={item.student_class} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <span className="text-lg mr-3">#{index + 1}</span>
                                        <span className="font-medium text-gray-800">{item.student_class}</span>
                                    </div>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                                        {item.total}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Violations */}
                <div className="bg-white rounded-lg shadow border">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">📋 Pelanggaran Terbaru</h2>
                            <Link href="/violations">
                                <Button variant="outline" size="sm">
                                    Lihat Semua
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Pelanggaran</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentViolations.map((violation) => {
                                    const typeInfo = violationTypeLabels[violation.violation_type] || violationTypeLabels.lateness;
                                    
                                    return (
                                        <tr key={violation.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{violation.student_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-gray-600">{violation.student_class}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{typeInfo.icon}</span>
                                                    <span className="text-gray-900">{typeInfo.label}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                                {new Date(violation.violation_date).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(violation.status)}`}>
                                                    {violation.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {recentViolations.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada pelanggaran yang tercatat
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}