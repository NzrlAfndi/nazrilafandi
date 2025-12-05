"use client"
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabaseClient';

export default function Navbar() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [isScrolled, setIsScrolled] = useState(false);
     const [brandName, setBrandName] = useState('KodingMulu');

     const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
     };

     useEffect(() => {
          const handleScroll = () => {
               setIsScrolled(window.scrollY > 50);
          };
          window.addEventListener('scroll', handleScroll);

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

          return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     return (
          <nav
               className={`
                    fixed z-[999] left-0 right-0 mx-auto
                    transition-all duration-500 ease-in-out
                    flex items-center justify-center
                    ${isScrolled
                         ? 'top-0 w-full rounded-none py-4 bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100'
                         : 'top-6 w-[95%] max-w-7xl rounded-full py-3 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50'
                    }
               `}
          >
               <div className="w-full max-w-6xl px-6 flex justify-between items-center h-full mx-auto">
                    <div className="flex items-center gap-1 cursor-pointer group">
                         <div className="text-2xl font-extrabold tracking-tight text-gray-800 group-hover:text-orange-600 transition-colors">
                              {brandName}<span className="text-orange-500">.</span>
                         </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                         {[
                              { label: 'Beranda', href: '#home' },
                              { label: 'Tentang Kami', href: '#tentang' },
                              { label: 'Layanan', href: '#services' },
                              { label: 'Harga', href: '#pricing' },
                              { label: 'Portfolio', href: '#portfolio' },
                              { label: 'Testimoni', href: '#testimoni' },
                              { label: 'Kontak', href: '#contact' },
                         ].map((link, index) => (
                              <a
                                   key={index}
                                   href={link.href}
                                   className="text-start font-semibold text-gray-600 hover:text-orange-500 transition-colors relative group"
                              >
                                   {link.label}
                                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                              </a>
                         ))}
                    </div>

                    <div className="flex items-center gap-4">
                         <a
                              href="#contact"
                              className={`
                                   hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-start transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5
                                   bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:to-orange-600
                              `}
                         >
                              Mulai Proyek <ArrowRight size={16} />
                         </a>

                         <button
                              className="md:hidden text-gray-600 hover:text-orange-600 focus:outline-none transition-colors p-2"
                              onClick={toggleMenu}
                         >
                              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                         </button>
                    </div>
               </div>

               {isMenuOpen && (
                    <div 
                         className="
                              absolute top-full left-0 right-0 mt-4 mx-auto w-[95%] max-w-7xl 
                              p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 md:hidden 
                              animate-fadeInUp 
                              z-[1000] 
                              max-h-[85vh] overflow-y-auto 
                         "
                    >
                         <div className="flex flex-col space-y-4 pb-2">
                              {[
                                   { label: 'Beranda', href: '#home' },
                                   { label: 'Tentang Kami', href: '#tentang' },
                                   { label: 'Layanan', href: '#services' },
                                   { label: 'Harga', href: '#pricing' },
                                   { label: 'Portfolio', href: '#portfolio' },
                                   { label: 'Testimoni', href: '#testimoni' },
                              ].map((link, index) => (
                                   <a 
                                        key={index}
                                        href={link.href} 
                                        onClick={() => setIsMenuOpen(false)} 
                                        className="text-gray-700 font-medium hover:text-orange-500 block px-2 py-2 border-b border-gray-50 last:border-0"
                                   >
                                        {link.label}
                                   </a>
                              ))}
                              
                              <hr className="border-gray-100 my-2" />
                              
                              <a 
                                   href="#contact" 
                                   onClick={() => setIsMenuOpen(false)} 
                                   className="text-center w-full block py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
                              >
                                   Mulai Proyek
                              </a>
                         </div>
                    </div>
               )}
          </nav>
     )
}