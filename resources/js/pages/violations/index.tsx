import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

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
}

interface Props {
    violations: {
        data: Violation[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
            from: number;
            to: number;
        };
    };
    classes: string[];
    violationTypes: Record<string, string>;
    statuses: Record<string, string>;
    filters: {
        search?: string;
        violation_type?: string;
        status?: string;
        class?: string;
        date_from?: string;
        date_to?: string;
    };
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
];

export default function ViolationsIndex({ violations, classes, violationTypes, statuses, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const params: Record<string, string | undefined> = {};
        
        ['search', 'violation_type', 'status', 'class', 'date_from', 'date_to'].forEach(key => {
            const value = formData.get(key) as string;
            if (value) params[key] = value;
        });
        
        router.get('/violations', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get('/violations', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            resolved: 'bg-green-100 text-green-800',
            escalated: 'bg-red-100 text-red-800',
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
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
            <Head title="Pelanggaran Siswa" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Pelanggaran Siswa</h1>
                        <p className="text-gray-600">Kelola dan pantau pelanggaran siswa</p>
                    </div>
                    <Link href="/violations/create">
                        <Button>➕ Tambah Pelanggaran</Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Cari
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    defaultValue={filters.search || ''}
                                    placeholder="Nama siswa, deskripsi, pelapor..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="violation_type" className="block text-sm font-medium text-gray-700 mb-1">
                                    Jenis Pelanggaran
                                </label>
                                <select
                                    id="violation_type"
                                    name="violation_type"
                                    defaultValue={filters.violation_type || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Semua Jenis</option>
                                    {Object.entries(violationTypes).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={filters.status || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Semua Status</option>
                                    {Object.entries(statuses).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                                    Kelas
                                </label>
                                <select
                                    id="class"
                                    name="class"
                                    defaultValue={filters.class || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Semua Kelas</option>
                                    {classes.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="date_from" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal Dari
                                </label>
                                <input
                                    type="date"
                                    id="date_from"
                                    name="date_from"
                                    defaultValue={filters.date_from || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="date_to" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal Sampai
                                </label>
                                <input
                                    type="date"
                                    id="date_to"
                                    name="date_to"
                                    defaultValue={filters.date_to || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit">🔍 Cari</Button>
                            {Object.values(filters).some(val => val) && (
                                <Button type="button" variant="outline" onClick={clearFilters}>
                                    🗑️ Reset
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Violations Table */}
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">
                            📋 Daftar Pelanggaran ({violations.meta.total})
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelapor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {violations.data.map((violation) => (
                                    <tr key={violation.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{violation.student_name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                                {violation.student_class}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="mr-2">{getViolationIcon(violation.violation_type)}</span>
                                                <span className="text-gray-900 text-sm">
                                                    {violationTypes[violation.violation_type] || violation.violation_type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {new Date(violation.violation_date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {violation.reporting_staff}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(violation.status)}`}>
                                                {statuses[violation.status] || violation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link href={`/violations/${violation.id}`}>
                                                <Button size="sm" variant="outline">
                                                    👁️ Detail
                                                </Button>
                                            </Link>
                                            <Link href={`/violations/${violation.id}/edit`}>
                                                <Button size="sm" variant="outline">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {violations.data.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <div className="text-4xl mb-2">📭</div>
                                <p>Tidak ada pelanggaran yang ditemukan</p>
                                {Object.values(filters).some(val => val) && (
                                    <Button variant="outline" onClick={clearFilters} className="mt-4">
                                        Reset Filter
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {violations.data.length > 0 && violations.links && (
                        <div className="px-6 py-4 border-t bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan {violations.meta.from} - {violations.meta.to} dari {violations.meta.total} pelanggaran
                                </div>
                                <div className="flex space-x-1">
                                    {violations.links.map((link, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded ${
                                                link.active 
                                                    ? 'bg-blue-500 text-white' 
                                                    : link.url 
                                                        ? 'bg-white text-gray-700 border hover:bg-gray-50' 
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}