import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Student {
    id: number;
    name: string;
    student_id: string;
    class: string;
    violations_count?: number;
    violations?: Array<{
        id: number;
        violation_type: string;
        violation_date: string;
        status: string;
    }>;
}

interface Props {
    students: {
        data: Student[];
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
    filters: {
        search?: string;
        class?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Data Siswa',
        href: '/students',
    },
];

export default function StudentsIndex({ students, classes, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const selectedClass = formData.get('class') as string;
        
        router.get('/students', {
            search: search || undefined,
            class: selectedClass || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get('/students', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Data Siswa" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">👥 Data Siswa</h1>
                        <p className="text-gray-600">Kelola data siswa dan lihat riwayat pelanggaran</p>
                    </div>
                    <Link href="/students/create">
                        <Button>➕ Tambah Siswa</Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                Cari Siswa
                            </label>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Nama, NIS, atau Kelas..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                                Filter Kelas
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
                        <div className="flex items-end gap-2">
                            <Button type="submit" className="flex-1">
                                🔍 Cari
                            </Button>
                            {(filters.search || filters.class) && (
                                <Button type="button" variant="outline" onClick={clearFilters}>
                                    🗑️ Reset
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">
                            📋 Daftar Siswa ({students.meta.total})
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIS</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggaran Terbaru</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.data.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{student.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {student.student_id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                                {student.class}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.violations && student.violations.length > 0 ? (
                                                <div className="space-y-1">
                                                    {student.violations.slice(0, 2).map((violation) => (
                                                        <div key={violation.id} className="text-sm text-gray-600">
                                                            {new Date(violation.violation_date).toLocaleDateString('id-ID')} - {violation.violation_type}
                                                        </div>
                                                    ))}
                                                    {student.violations.length > 2 && (
                                                        <div className="text-xs text-gray-500">
                                                            +{student.violations.length - 2} lainnya
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-green-600 text-sm">Tidak ada pelanggaran</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link href={`/students/${student.id}`}>
                                                <Button size="sm" variant="outline">
                                                    👁️ Detail
                                                </Button>
                                            </Link>
                                            <Link href={`/students/${student.id}/edit`}>
                                                <Button size="sm" variant="outline">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {students.data.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <div className="text-4xl mb-2">📭</div>
                                <p>Tidak ada siswa yang ditemukan</p>
                                {(filters.search || filters.class) && (
                                    <Button variant="outline" onClick={clearFilters} className="mt-4">
                                        Reset Filter
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {students.data.length > 0 && students.links && (
                        <div className="px-6 py-4 border-t bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan {students.meta.from} - {students.meta.to} dari {students.meta.total} siswa
                                </div>
                                <div className="flex space-x-1">
                                    {students.links.map((link, index: number) => (
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