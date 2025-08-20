import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Navigation */}
            <nav className="p-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <span className="text-white font-bold text-xl">📚</span>
                    </div>
                    <span className="font-bold text-xl text-gray-800">SMK Monitor</span>
                </div>
                <div className="space-x-4">
                    <Link href="/login">
                        <Button variant="outline">Masuk</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Daftar</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        🏫 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Sistem Monitoring Pelanggaran Siswa SMK
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Aplikasi modern untuk memantau dan mengelola pelanggaran siswa dengan efisien. 
                        Membantu administrator dan guru piket dalam mencatat, melacak, dan menganalisis 
                        pelanggaran siswa di lingkungan sekolah.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">⏰</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Pencatatan Pelanggaran</h3>
                        <p className="text-gray-600 text-sm">Catat pelanggaran siswa dengan detail lengkap termasuk jenis, tanggal, dan tindakan disiplin.</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Pencarian & Filter</h3>
                        <p className="text-gray-600 text-sm">Cari pelanggaran berdasarkan nama siswa, tanggal, jenis pelanggaran, atau kelas dengan mudah.</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Laporan & Statistik</h3>
                        <p className="text-gray-600 text-sm">Generate laporan komprehensif dan lihat statistik pelanggaran untuk analisis lebih lanjut.</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Manajemen Siswa</h3>
                        <p className="text-gray-600 text-sm">Kelola data siswa dan lihat riwayat pelanggaran setiap siswa dalam satu tempat.</p>
                    </div>
                </div>

                {/* Violation Types */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Jenis Pelanggaran yang Didukung</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-4 rounded-lg bg-red-50 border border-red-100">
                            <div className="text-3xl mb-2">⏰</div>
                            <h3 className="font-semibold text-red-800">Keterlambatan</h3>
                            <p className="text-sm text-red-600 mt-1">Datang terlambat ke sekolah atau kelas</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-100">
                            <div className="text-3xl mb-2">👔</div>
                            <h3 className="font-semibold text-blue-800">Pelanggaran Seragam</h3>
                            <p className="text-sm text-blue-600 mt-1">Tidak sesuai dress code sekolah</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-100">
                            <div className="text-3xl mb-2">📝</div>
                            <h3 className="font-semibold text-orange-800">Ketidakjujuran Akademik</h3>
                            <p className="text-sm text-orange-600 mt-1">Menyontek, plagiarisme</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-100">
                            <div className="text-3xl mb-2">😤</div>
                            <h3 className="font-semibold text-purple-800">Perilaku Mengganggu</h3>
                            <p className="text-sm text-purple-600 mt-1">Mengganggu proses pembelajaran</p>
                        </div>
                    </div>
                </div>

                {/* Screenshot/Mockup Section */}
                <div className="bg-gray-900 rounded-2xl p-8 text-white mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Monitoring</h2>
                    <div className="bg-gray-800 rounded-lg p-6 min-h-64 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-2">Dashboard Analitik</h3>
                            <p className="text-gray-400">
                                Lihat statistik pelanggaran, tren bulanan, dan laporan real-time<br />
                                untuk membantu pengambilan keputusan yang tepat
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Siap Memulai Monitoring yang Lebih Efektif?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Bergabunglah dengan sistem monitoring siswa yang telah dipercaya oleh banyak sekolah
                        untuk meningkatkan kedisiplinan dan kualitas pendidikan.
                    </p>
                    <div className="space-x-4">
                        <Link href="/register">
                            <Button size="lg" className="px-8 py-3 text-lg">
                                🚀 Mulai Sekarang
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                                Masuk ke Sistem
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <span className="text-white font-bold text-lg">📚</span>
                        </div>
                        <span className="font-bold text-xl">SMK Monitor</span>
                    </div>
                    <p className="text-gray-400">
                        Sistem Monitoring Pelanggaran Siswa SMK - Mendukung Kedisiplinan & Kualitas Pendidikan
                    </p>
                </div>
            </footer>
        </div>
    );
}