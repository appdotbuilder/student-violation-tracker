import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface StudentFormData {
    name: string;
    student_id: string;
    class: string;
    [key: string]: string;
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
    {
        title: 'Tambah Siswa',
        href: '/students/create',
    },
];

const classes = [
    'X RPL 1', 'X RPL 2', 'X TKJ 1', 'X TKJ 2', 'X MM 1', 'X MM 2',
    'XI RPL 1', 'XI RPL 2', 'XI TKJ 1', 'XI TKJ 2', 'XI MM 1', 'XI MM 2',
    'XII RPL 1', 'XII RPL 2', 'XII TKJ 1', 'XII TKJ 2', 'XII MM 1', 'XII MM 2',
];

export default function CreateStudent() {
    const { data, setData, post, processing, errors } = useForm<StudentFormData>({
        name: '',
        student_id: '',
        class: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/students');
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Tambah Siswa" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">➕ Tambah Siswa Baru</h1>
                    <p className="text-gray-600">Tambahkan data siswa baru ke sistem</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan nama lengkap siswa"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">
                                NIS (Nomor Induk Siswa) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="student_id"
                                value={data.student_id}
                                onChange={(e) => setData('student_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Contoh: 2024001"
                                required
                            />
                            {errors.student_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                                Kelas <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="class"
                                value={data.class}
                                onChange={(e) => setData('class', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Pilih Kelas</option>
                                {classes.map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                            {errors.class && (
                                <p className="mt-1 text-sm text-red-600">{errors.class}</p>
                            )}
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
                                    disabled={processing}
                                    className="min-w-[120px]"
                                >
                                    {processing ? '⏳ Menyimpan...' : '💾 Simpan'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}