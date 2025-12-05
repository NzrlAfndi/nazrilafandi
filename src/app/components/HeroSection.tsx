"use client"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export default function HeroSection() {
     const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
               element.scrollIntoView({ behavior: 'smooth' });
          }
     };

     return (
          <section id="home" className="pt-32 pb-20 gradient-orange min-h-screen flex items-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
               </div>

               <div className="container mx-auto px-6 relative z-20">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                         <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeInUp relative z-30">
                              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                                   🚀 Jasa Pembuatan Website Terpercaya
                              </span>
                              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                                   Bangun Bisnis Digital Anda <span className="text-yellow-300 animate-blink-slow inline-block">Sekarang</span>
                              </h1>
                              <p className="text-lg text-white/90 mb-8 max-w-lg">
                                   Kami membantu UMKM dan perusahaan bertransformasi digital dengan website yang cepat, aman, dan memikat pelanggan.
                              </p>

                              <div className="flex flex-col sm:flex-row gap-4 relative z-30">
                                   <Link
                                        href="#portfolio"
                                        onClick={(e) => handleLinkClick(e, '#portfolio')}
                                        className="px-8 py-3 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 active:bg-gray-200 transition shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95 transform duration-150 touch-manipulation"
                                   >
                                        Lihat Projek <ArrowRight size={20} />
                                   </Link>
                                   <Link
                                        href="#contact"
                                        onClick={(e) => handleLinkClick(e, '#contact')}
                                        className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 active:bg-white/20 transition text-center cursor-pointer active:scale-95 transform duration-150 touch-manipulation"
                                   >
                                        Konsultasi Gratis
                                   </Link>
                              </div>
                         </div>

                         <div className="md:w-1/2 flex justify-center animate-float pointer-events-none select-none">
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