"use client"
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
     const scrollToSection = (sectionId: string) => {
          const element = document.getElementById(sectionId);
          if (element) {
               element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
     };

     return (
          <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 min-h-screen flex items-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
               </div>

               <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                         <div className="md:w-1/2 w-full">
                              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                                   🚀 Jasa Pembuatan Website Terpercaya
                              </span>
                              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                                   Bangun Bisnis Digital Anda <span className="text-yellow-300 inline-block">Sekarang</span>
                              </h1>
                              <p className="text-lg text-white/90 mb-8 max-w-lg">
                                   Kami membantu UMKM dan perusahaan bertransformasi digital dengan website yang cepat, aman, dan memikat pelanggan.
                              </p>
                              
                              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                   <button
                                        onClick={() => scrollToSection('portfolio')}
                                        className="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 active:bg-gray-200 transition-all shadow-lg text-center inline-flex items-center justify-center gap-2 select-none"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                   >
                                        Lihat Projek <ArrowRight size={20} />
                                   </button>
                                   <button
                                        onClick={() => scrollToSection('contact')}
                                        className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 active:bg-white/20 transition-all text-center select-none"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                   >
                                        Konsultasi Gratis
                                   </button>
                              </div>
                         </div>

                         <div className="md:w-1/2 w-full flex justify-center pointer-events-none select-none">
                              <svg className="w-full max-w-md h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="50" y="50" width="300" height="200" rx="10" fill="white" fillOpacity="0.9" />
                                   <rect x="50" y="50" width="300" height="30" rx="10" fill="#fbbf24" />
                                   <circle cx="70" cy="65" r="5" fill="white" />
                                   <circle cx="90" cy="65" r="5" fill="white" />
                                   <circle cx="110" cy="65" r="5" fill="white" />
                                   <rect x="80" y="110" width="140" height="20" rx="5" fill="#f97316" />
                                   <rect x="80" y="150" width="240" height="10" rx="2" fill="#e5e7eb" />
                                   <rect x="80" y="170" width="200" height="10" rx="2" fill="#e5e7eb" />
                                   <rect x="250" y="110" width="70" height="70" rx="5" fill="#fed7aa" />
                              </svg>
                         </div>
                    </div>
               </div>
          </section>
     )
}