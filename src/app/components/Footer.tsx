"use client"
import { Instagram } from 'lucide-react'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Footer() {
     const [branding, setBranding] = useState({
          appName: 'KodingMulu',
          instagram: '@kodingmulu'
     });

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
                    console.error("Gagal memuat nama website:", error);
               }
          };

          fetchBranding();
     })

     return (
          <footer className="bg-gray-900 text-white py-10">
               <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                         <div className="mb-4 md:mb-0">
                              <span className="text-2xl font-bold">{branding.appName}<span className="text-orange-500">.</span></span>
                              <p className="text-gray-400 text-sm mt-2">Partner digital terbaik untuk bisnis Anda.</p>
                         </div>
                         <div className="flex space-x-6 text-gray-400">
                              <a href={`https://instagram.com/${branding.instagram}`} className="hover:text-orange-500 transition"><Instagram size={24} /></a>
                         </div>
                    </div>
                    <hr className="border-gray-800 my-8" />
                    <p className="text-center text-gray-500 text-sm">&copy; 2025 {branding.appName}. All rights reserved.</p>
               </div>
          </footer>
     )
}
