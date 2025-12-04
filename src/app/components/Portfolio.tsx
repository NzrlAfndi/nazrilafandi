"use client"
import { ArrowRight, ExternalLink, ImageOff, Laptop, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react';

type PortfolioItem = {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  image_url: string | null;
  live_url: string | null;
}

export default function Portfolio() {
     const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          const fetchPortfolios = async () => {
               try {
                    const { data, error } = await supabase
                         .from('portfolios')
                         .select('*')
                         .eq('status', 'published')
                         .order('created_at', { ascending: false });

                    if (error) throw error;
                    if (data) setPortfolios(data);
               } catch (error) {
                    console.error("Gagal memuat portfolio:", error);
               } finally {
                    setIsLoading(false);
               }
          };

          fetchPortfolios();
     }, []);

     return (
          <section id="portfolio" className="py-20 bg-white">
               <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-4">Projek Terbaru</h2>
                    <p className="text-center text-gray-600 mb-12">Salah satu karya terbaik yang telah kami selesaikan.</p>

                    {isLoading && (
                         <div className="flex justify-center py-20">
                              <Loader2 size={40} className="animate-spin text-orange-500" />
                         </div>
                    )}

                    {!isLoading && portfolios.length === 0 && (
                         <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                              <Laptop className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                              <p className="text-gray-500 font-medium">Belum ada projek yang dipublikasikan.</p>
                         </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {portfolios.map((item) => (
                              <div 
                                   key={item.id} 
                                   className="group relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/3] border border-gray-200"
                              >
                                   {item.image_url ? (
                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                   ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 flex-col">
                                             <ImageOff size={48} className="mb-2 opacity-50" />
                                             <span className="text-sm">No Preview</span>
                                        </div>
                                   )}

                                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                        <span className="text-orange-400 font-bold text-xs mb-2 uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition duration-300 delay-100">
                                             {item.category}
                                        </span>
                                        
                                        <h3 className="text-2xl font-bold text-white mb-3 translate-y-4 group-hover:translate-y-0 transition duration-300 delay-150">
                                             {item.title}
                                        </h3>
                                        
                                        <p className="text-gray-300 text-sm mb-6 line-clamp-2 translate-y-4 group-hover:translate-y-0 transition duration-300 delay-200">
                                             {item.description}
                                        </p>

                                        <div className="translate-y-4 group-hover:translate-y-0 transition duration-300 delay-250">
                                             {item.live_url ? (
                                                  <a 
                                                       href={item.live_url} 
                                                       target="_blank" 
                                                       rel="noopener noreferrer"
                                                       className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-orange-700 transition shadow-lg"
                                                  >
                                                       Lihat Detail <ArrowRight size={18} />
                                                  </a>
                                             ) : (
                                                  <span className="inline-block bg-white/20 text-white px-5 py-2.5 rounded-full backdrop-blur-md font-medium border border-white/30 text-sm">
                                                       Demo Tidak Tersedia
                                                  </span>
                                             )}
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     )
}
