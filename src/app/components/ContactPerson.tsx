"use client"
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function ContactPerson() {
     const [branding, setBranding] = useState({
          phone: '',
          email: ''
     });

     useEffect(() => {
          const fetchBranding = async () => {
               try {
                    const { data, error } = await supabase
                         .from('site_settings')
                         .select('phone, email')
                         .single();

                    if (data && !error) {
                         setBranding({
                              phone: data.phone || '+6282373641020',
                              email: data.email || 'kodingmulu@gmail.com'
                         });
                    }
               } catch (error) {
                    console.error("Gagal memuat nama website:", error);
               }
          };

          fetchBranding();
     })

     return (
          <section id="contact" className="py-20 gradient-orange">
               <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                         <div className="md:w-1/2 p-10 bg-gray-50">
                              <h3 className="text-2xl font-bold text-gray-800 mb-4">Hubungi Kami</h3>
                              <p className="text-gray-600 mb-8">Siap memulai projek Anda? Hubungi kami melalui form atau kontak di bawah ini.</p>

                              <div className="space-y-4">
                                   <div className="flex items-center space-x-3 text-gray-700">
                                        <Phone className="text-orange-500" size={20} />
                                        <span>{branding.phone}</span>
                                   </div>
                                   <div className="flex items-center space-x-3 text-gray-700">
                                        <Mail className="text-orange-500" size={20} />
                                        <span>{branding.email}</span>
                                   </div>
                              </div>

                              <div className="mt-8">
                                   <a href={`https://wa.me/${branding.phone}`} className="inline-flex items-center justify-center w-full px-4 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition gap-2">
                                        <MessageCircle size={20} />
                                        Chat via WhatsApp
                                   </a>
                              </div>
                         </div>
                         <div className="md:w-1/2 p-10">
                              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                   <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Nama</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" placeholder="Nama Anda" />
                                   </div>
                                   <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                        <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" placeholder="email@contoh.com" />
                                   </div>
                                   <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Pesan</label>
                                        <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" placeholder="Ceritakan kebutuhan website Anda..."></textarea>
                                   </div>
                                   <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700 transition shadow-md">Kirim Pesan</button>
                              </form>
                         </div>
                    </div>
               </div>
          </section>
     )
}
