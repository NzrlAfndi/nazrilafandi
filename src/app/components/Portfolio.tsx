"use client"
import { ArrowRight, ImageOff, Laptop, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react';

type PortfolioItem = {
  id: number; title: string; client: string; category: string;
  description: string; image_url: string | null; live_url: string | null;
}

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('portfolios').select('*').eq('status','published').order('created_at',{ascending:false})
      .then(({ data }) => { if (data) setPortfolios(data); setIsLoading(false); });
  }, []);

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-section pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <span className="section-badge mb-3 inline-block">PORTFOLIO</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Projek Terbaru</h2>
          <p className="text-gray-500 mt-3 text-sm">Salah satu karya terbaik yang telah kami selesaikan.</p>
        </div>

        {isLoading && <div className="flex justify-center py-20"><Loader2 size={36} className="animate-spin text-orange-400" /></div>}

        {!isLoading && portfolios.length === 0 && (
          <div className="text-center py-20 glass-card">
            <Laptop className="mx-auto h-10 w-10 text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm">Belum ada projek yang dipublikasikan.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((item) => {
            const isActive = active === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActive(isActive ? null : item.id)}
                onMouseLeave={() => setActive(null)}
                className="group relative rounded-[20px] overflow-hidden aspect-[4/3] cursor-pointer
                  border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,.08)]
                  hover:shadow-[0_12px_40px_rgba(249,115,22,.20)] hover:-translate-y-1 transition-all duration-300 touch-manipulation"
              >
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-orange-50 text-gray-300 flex-col">
                    <ImageOff size={40} className="mb-2 opacity-40" />
                    <span className="text-xs">No Preview</span>
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent
                  transition-all duration-300 flex flex-col justify-end p-6
                  ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <span className={`text-orange-400 font-bold text-xs mb-1.5 uppercase tracking-widest transition duration-300 delay-75 ${isActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>{item.category}</span>
                  <h3 className={`text-xl font-extrabold text-white mb-2 transition duration-300 delay-100 ${isActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>{item.title}</h3>
                  <p className={`text-gray-300 text-xs mb-5 line-clamp-2 transition duration-300 delay-150 ${isActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>{item.description}</p>
                  <div className={`transition duration-300 delay-200 ${isActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                    {item.live_url ? (
                      <a href={item.live_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-2 btn-tahoe-primary px-5 py-2.5 rounded-full font-bold text-sm">
                        Lihat Detail <ArrowRight size={15} />
                      </a>
                    ) : (
                      <span className="inline-block glass text-white/80 px-4 py-2 rounded-full text-xs font-medium">Demo Tidak Tersedia</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}