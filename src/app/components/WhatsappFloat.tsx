'use client'

import React, { useEffect, useState } from 'react';
import { MessageCircle, X, Send, Phone, MessageCirclePlus, MessageCircleMore, MessageCircleIcon, MessageCircleOff, MessageCircleHeartIcon, MessageCircleHeart } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function WhatsAppFloat() {
     const [isOpen, setIsOpen] = useState(false);
     const [message, setMessage] = useState('');
     const [branding, setBranding] = useState({
          adminName: 'KodingMulu',
          phone: '6282373641020'
     });

     useEffect(() => {
          const fetchBranding = async () => {
               try {
                    const { data, error } = await supabase
                         .from('site_settings')
                         .select('app_name, phone')
                         .single();

                    if (data && !error) {
                         setBranding({
                              adminName: data.app_name || 'KodingMuulu',
                              phone: data.phone || '6282373641020'
                         });
                    }
               } catch (error) {
                    console.error("Gagal memuat nama website:", error);
               }
          };

          fetchBranding();

     }, []);

     const defaultMessage = 'Halo, saya tertarik dengan jasa pembuatan website.';

     const handleSend = (e: React.FormEvent) => {
          e.preventDefault();

          // Jika user tidak mengetik apa-apa, gunakan pesan default
          const textToSend = message.trim() || defaultMessage;

          // Format URL WhatsApp
          const url = `https://wa.me/${branding.phone}?text=${encodeURIComponent(textToSend)}`;

          // Buka di tab baru
          window.open(url, '_blank');

          // Reset dan tutup (opsional)
          setMessage('');
          setIsOpen(false);
     };

     return (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">

               {/* 1. POPUP WINDOW */}
               <div
                    className={`
          bg-white w-[320px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right border border-gray-100
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}
        `}
               >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                              {/* Avatar Admin */}
                              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                                   <Phone size={20} />
                              </div>
                              <div>
                                   <h4 className="font-bold text-white text-sm">Admin {branding.adminName}</h4>
                                   <p className="text-green-100 text-xs flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                        Online Sekarang
                                   </p>
                              </div>
                         </div>
                         <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition">
                              <X size={20} />
                         </button>
                    </div>

                    {/* Body Chat */}
                    <div className="bg-gray-50 h-64 p-4 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d986a26065.png')]">
                         {/* Pesan Otomatis dari Admin */}
                         <div className="flex justify-start mb-4">
                              <div className="bg-white text-gray-800 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm max-w-[85%] text-sm">
                                   Halo! 👋 Ada yang bisa kami bantu untuk projek website Anda?
                                   <div className="text-[10px] text-gray-400 text-right mt-1">
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Footer Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                         <input
                              type="text"
                              placeholder="Ketik pesan..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
                         />
                         <button
                              type="submit"
                              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md flex-shrink-0"
                         >
                              <Send size={18} className="ml-0.5" />
                         </button>
                    </form>
               </div>

               {/* 2. FLOATING BUTTON (LAUNCHER) */}
               <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            group flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 hover:-translate-y-1
            ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-green-500 hover:bg-green-600'}
        `}
               >
                    {isOpen ? (
                         <X size={24} className="text-white transition-transform duration-300" />
                    ) : (
                         <div className="relative">
                              <MessageCircleMore size={28} className="text-white" />
                              {/* Notification Dot */}
                              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-green-500 rounded-full"></span>
                         </div>
                    )}
               </button>

          </div>
     );
}