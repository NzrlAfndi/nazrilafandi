'use client'

import { supabase } from '@/lib/supabaseClient';
import { Clock, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutUs() {
    const [brandName, setBrandName] = useState('KodingMulu');

    useEffect(() => {
        const fetchBranding = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('app_name')
                    .single();

                if (data && !error) {
                    setBrandName(data.app_name || 'KodingMulu');
                }
            } catch (error) {
                console.error("Gagal memuat nama website:", error);
            }
        };

        fetchBranding();
    }, []);

    return (
        <section id='tentang' className="bg-white font-sans text-gray-800 overflow-hidden">
            <div className="container mx-auto px-6 py-20 relative">
                <div className="absolute top-20 left-0 w-64 h-64 bg-orange-100/60 rounded-full blur-3xl -translate-x-1/2"></div>
                <div className="absolute bottom-20 right-0 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl translate-x-1/2"></div>
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
                    <div className="w-full lg:w-5/12">
                        <div className="relative rounded-[3rem] rounded-tl-none overflow-hidden shadow-2xl border-[6px] border-white aspect-[3/4] bg-gray-100 group">
                            <img
                                src='/me.webp'
                                alt="Foto Profil Founder"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent mix-blend-overlay"></div>

                            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50">
                                <p className="text-2xl font-extrabold text-orange-600">Founder & Lead</p>
                                <p className="text-sm text-gray-600 font-medium">{brandName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-7/12 space-y-5">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4 border border-orange-200">
                                TENTANG KAMI
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
                                Kualitas Di <br className="hidden md:block" />
                                <span className="text-orange-600 relative">
                                    Atas Kuantitas
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-200" viewBox="0 0 100 12" fill="currentColor" preserveAspectRatio="none"><path d="M0,10 Q50,0 100,10 L100,12 Q50,2 0,12 Z" /></svg>
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Selama <span className="font-bold text-gray-800">3 tahun</span> berkarya, kami memilih untuk fokus pada detail dan kualitas ketimbang kuantitas. Setiap projek yang kami tangani mendapatkan perhatian penuh dan dedikasi 100% untuk memastikan hasil akhir yang presisi, performa tinggi, dan sesuai ekspektasi bisnis Anda.
                            </p>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-500 italic text-gray-700 text-lg">
                            &quot;Kami tidak sekadar menyelesaikan tugas, kami membangun aset digital yang kami banggakan. Bisnis Anda adalah prioritas utama kami.&quot;
                        </div>

                        <div className="grid gap-6 pt-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mt-1">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Kualitas Terjamin</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Setiap piksel dan baris kode dibuat secara teliti agar unik dan mencerminkan identitas brand Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mt-1">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Pengerjaan Tepat Waktu</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Dengan membatasi jumlah klien, kami bisa mendedikasikan waktu lebih banyak untuk menyempurnakan projek Anda tanpa terburu-buru mengejar deadline projek lain.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Pendekatan Kolaboratif</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Anda tidak akan bicara dengan customer service, tapi langsung dengan developernya. Komunikasi langsung, cepat, dan tanpa miskomunikasi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:to-orange-700 transition transform hover:-translate-y-1"
                            >
                                Hubungi Kami <ArrowRight size={20} />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}