'use client'

import React from 'react';
import { Clock, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id='tentang' className="bg-white font-sans text-gray-800 overflow-hidden">
      
      {/* 1. HERO SECTION: Story & Image */}
      <div className="container mx-auto px-6 py-20 relative">
        
        {/* Background Decoration */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-orange-100/60 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl translate-x-1/2"></div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
            
            {/* --- KOLOM KIRI: GAMBAR --- */}
            <div className="w-full lg:w-5/12">
                <div className="relative rounded-[3rem] rounded-tl-none overflow-hidden shadow-2xl border-[6px] border-white aspect-[3/4] bg-gray-100 group">
                    <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
                        alt="Foto Profil Founder" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent mix-blend-overlay"></div>

                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50">
                        <p className="text-2xl font-extrabold text-orange-600">Founder & Lead</p>
                        <p className="text-sm text-gray-600 font-medium">DevStudio.</p>
                    </div>
                </div>
            </div>

            {/* --- KOLOM KANAN: TEKS & CERITA --- */}
            <div className="w-full lg:w-7/12 space-y-1">
                
                {/* Header */}
                <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4 border border-orange-200">
                        TENTANG KAMI
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
                        Tim Ahli <br className="hidden md:block"/>
                        <span className="text-orange-600 relative">
                            Solusi Digital
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-200" viewBox="0 0 100 12" fill="currentColor" preserveAspectRatio="none"><path d="M0,10 Q50,0 100,10 L100,12 Q50,2 0,12 Z"/></svg>
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Kami adalah tim profesional dengan pengalaman lebih dari <span className="font-bold text-gray-800">10 tahun</span> di bidang pengembangan web, desain UI/UX, dan solusi digital.
                    </p>
                </div>

                {/* --- PERBAIKAN DI SINI (Ganti " dengan &quot;) --- */}
                <div className="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-500 italic text-gray-700 text-lg">
                    &quot;Komitmen kami adalah memberikan layanan berkualitas tinggi yang membantu bisnis Anda berkembang dan bersaing di era digital.&quot;
                </div>

                {/* Poin Nilai (Grid 3 Kolom) */}
                <div className="grid gap-6 pt-4">
                    
                    {/* Poin 1 */}
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mt-1">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Kualitas Terjamin</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Kami mengutamakan kualitas dalam setiap proyek, dengan perhatian pada detail dan standar kode yang tinggi.
                            </p>
                        </div>
                    </div>

                    {/* Poin 2 */}
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mt-1">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Pengerjaan Tepat Waktu</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Kami berkomitmen menyelesaikan proyek sesuai dengan tenggat waktu yang telah disepakati.
                            </p>
                        </div>
                    </div>

                    {/* Poin 3 */}
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1">
                            <Users size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Pendekatan Kolaboratif</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Kami bermitra dengan klien dalam setiap tahap proyek, memastikan hasil akhir sesuai dengan visi dan kebutuhan bisnis.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi */}
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