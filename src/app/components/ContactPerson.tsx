"use client"
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function ContactPerson() {
  const [branding, setBranding] = useState({ phone: '', email: '' });

  const getWhatsAppUrl = (phone: string) => {
    if (!phone) return '#';
    let n = phone.replace(/\D/g,'');
    if (n.startsWith('0')) n = '62' + n.slice(1);
    return `https://wa.me/${n}`;
  };

  useEffect(() => {
    supabase.from('site_settings').select('phone, email').single()
      .then(({ data }) => {
        if (data) setBranding({ phone: data.phone || '+6282373641020', email: data.email || 'kodingmulu@gmail.com' });
      });
  }, []);

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Orange gradient backdrop — glass card sits on top */}
      <div className="absolute inset-0 gradient-orange opacity-90 pointer-events-none" />
      {/* Ambient blur orbs on the orange bg */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-xs font-bold mb-3 border border-white/30 backdrop-blur-sm">KONTAK</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Mulai Proyek Anda</h2>
          <p className="text-white/75 mt-2 text-sm">Konsultasi gratis, tanpa komitmen.</p>
        </div>

        <div className="glass-strong rounded-[28px] overflow-hidden flex flex-col md:flex-row">
          {/* Info */}
          <div className="md:w-5/12 p-10 border-b md:border-b-0 md:border-r border-white/30">
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Hubungi Kami</h3>
            <p className="text-gray-500 text-sm mb-8">Siap memulai projek Anda? Hubungi kami melalui form atau kontak di bawah ini.</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-orange-500" />
                </div>
                <span className="text-sm font-medium">{branding.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-orange-500" />
                </div>
                <span className="text-sm font-medium">{branding.email}</span>
              </div>
            </div>

            <div className="mt-8">
              <a href={getWhatsAppUrl(branding.phone)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold gap-2 transition shadow-lg hover:shadow-xl active:scale-95 text-sm">
                <MessageCircle size={18} /> Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:w-7/12 p-10">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama</label>
                <input type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/60 bg-white/60 backdrop-blur-sm text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition"
                  placeholder="Nama Anda" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Email</label>
                <input type="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/60 bg-white/60 backdrop-blur-sm text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition"
                  placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Pesan</label>
                <textarea rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/60 bg-white/60 backdrop-blur-sm text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition resize-none"
                  placeholder="Ceritakan kebutuhan website Anda..." />
              </div>
              <button type="button"
                className="w-full btn-tahoe-primary py-3 rounded-xl font-bold text-sm">
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}