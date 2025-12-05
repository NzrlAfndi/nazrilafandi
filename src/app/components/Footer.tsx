"use client"
import { Instagram } from 'lucide-react'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Footer() {
     const [branding, setBranding] = useState({
          appName: 'KodingMulu',
          instagram: '@kodingmulu'
     });

     const getInstagramUrl = (username: string) => {
          if (!username) return '#';
          const cleanUsername = username.replace('@', '').trim(); 
          return `https://instagram.com/${cleanUsername}`;
     };

     useEffect(() => {
          const fetchBranding = async () => {
               try {
                    const { data, error } = await supabase
                         .from('site_settings')
                         .select('app_name, instagram')
                         .single();

                    if (data && !error) {
                         setBranding({
                              appName: data.app_name || 'KodingMulu',
                              instagram: data.instagram || '@kodingmulu'
                         });
                    }
               } catch (error) {
                    console.error("Gagal memuat footer:", error);
               }
          };

          fetchBranding();
     }, []);

     return (
          <footer className="bg-gray-900 text-white py-10 relative z-10">
               <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                         <div className="text-center md:text-left">
                              <span className="text-2xl font-bold block md:inline">
                                   {branding.appName}<span className="text-orange-500">.</span>
                              </span>
                              <p className="text-gray-400 text-sm mt-2">Partner digital terbaik untuk bisnis Anda.</p>
                         </div>
                         
                         <div className="flex items-center">
                              <a 
                                   href={getInstagramUrl(branding.instagram)} 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="Follow us on Instagram"
                                   className="
                                        inline-flex items-center justify-center 
                                        p-3 rounded-full 
                                        bg-white/5 hover:bg-white/10 
                                        text-gray-400 hover:text-orange-500 
                                        transition-all duration-300 
                                        active:scale-95
                                   "
                              >
                                   <Instagram size={24} />
                              </a>
                         </div>
                    </div>
                    <hr className="border-gray-800 my-8" />
                    <p className="text-center text-gray-500 text-sm">&copy; 2025 {branding.appName}. All rights reserved.</p>
               </div>
          </footer>
     )
}