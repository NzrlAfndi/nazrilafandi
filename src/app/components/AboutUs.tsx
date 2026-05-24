'use client'
import { supabase } from '@/lib/supabaseClient';
import { Clock, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutUs() {
  const [brandName, setBrandName] = useState('KodingMulu');
  useEffect(() => {
    supabase.from('site_settings').select('app_name').single()
      .then(({ data }) => { if (data) setBrandName(data.app_name || 'KodingMulu'); });
  }, []);

  return (
    <section id="tentang" className="relative py-24 overflow-hidden">
      {/* Glass section band */}
      <div className="absolute inset-0 glass-section pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* Photo */}
          <div className="w-full lg:w-5/12">
            <div className="relative rounded-[3rem] rounded-tl-none overflow-hidden border-[5px] border-white/70 shadow-[0_20px_60px_rgba(249,115,22,.18)] aspect-[3/4] bg-orange-100 group">
              <img src="/me.webp" alt="Foto Profil Founder" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent mix-blend-overlay" />
              <div className="absolute bottom-5 left-5 glass-card px-4 py-3">
                <p className="text-lg font-extrabold text-orange-600">Founder &amp; Lead</p>
                <p className="text-sm text-gray-600 font-medium">{brandName}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-7/12 space-y-6">
            <div>
              <span className="section-badge mb-4 inline-block">TENTANG KAMI</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight text-gray-900">
                Kualitas Di <br className="hidden md:block" />
                <span className="text-gradient-orange relative">
                  Atas Kuantitas
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none">
                    <path d="M2 7C60 2 120 2 150 4C180 6 240 2 298 2" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" opacity=".5"/>
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Selama <span className="font-bold text-gray-800">3 tahun</span> berkarya, kami fokus pada detail dan kualitas ketimbang kuantitas. Setiap projek mendapatkan perhatian penuh dan dedikasi 100%.
              </p>
            </div>

            {/* Quote */}
            <div className="glass-card px-6 py-5 border-l-4 border-orange-400 italic text-gray-700 text-base rounded-2xl">
              &quot;Kami tidak sekadar menyelesaikan tugas, kami membangun aset digital yang kami banggakan.&quot;
            </div>

            {/* Features */}
            <div className="grid gap-5 pt-2">
              {[
                { icon: ShieldCheck, color: 'bg-blue-100 text-blue-600', title: 'Kualitas Terjamin', desc: 'Setiap piksel dan baris kode dibuat secara teliti agar unik dan mencerminkan identitas brand Anda.' },
                { icon: Clock, color: 'bg-orange-100 text-orange-600', title: 'Pengerjaan Tepat Waktu', desc: 'Dengan membatasi jumlah klien, kami bisa mendedikasikan waktu lebih banyak untuk menyempurnakan projek Anda.' },
                { icon: Users, color: 'bg-green-100 text-green-600', title: 'Pendekatan Kolaboratif', desc: 'Anda berbicara langsung dengan developernya — komunikasi cepat, tanpa miskomunikasi.' },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 ${color} rounded-full flex items-center justify-center mt-0.5`}>
                    <Icon size={19} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href="#contact" className="btn-tahoe-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold">
                Hubungi Kami <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}