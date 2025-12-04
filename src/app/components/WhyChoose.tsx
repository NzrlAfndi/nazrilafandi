import { Search, Smartphone, Zap } from 'lucide-react'
import React from 'react'

export default function WhyChoose() {
     return (
          <section id="why-us" className="py-20 bg-orange-50">
               <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold text-gray-800 mb-4">Kenapa Memilih Jasa Kami?</h2>
                         <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                         <div className="bg-white p-8 rounded-xl shadow-sm border border-orange-100 hover:transform hover:-translate-y-2 hover:shadow-xl transition duration-300">
                              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                                   <Zap size={24} />
                              </div>
                              <h3 className="text-xl font-bold mb-3">Performa Cepat</h3>
                              <p className="text-gray-600">Website dioptimasi untuk kecepatan loading maksimal agar pengunjung tidak kabur.</p>
                         </div>
                         <div className="bg-white p-8 rounded-xl shadow-sm border border-orange-100 hover:transform hover:-translate-y-2 hover:shadow-xl transition duration-300">
                              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                                   <Smartphone size={24} />
                              </div>
                              <h3 className="text-xl font-bold mb-3">Responsif Mobile</h3>
                              <p className="text-gray-600">Tampilan menyesuaikan dengan sempurna di semua perangkat, dari HP hingga Desktop.</p>
                         </div>
                         <div className="bg-white p-8 rounded-xl shadow-sm border border-orange-100 hover:transform hover:-translate-y-2 hover:shadow-xl transition duration-300">
                              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                                   <Search size={24} />
                              </div>
                              <h3 className="text-xl font-bold mb-3">SEO Friendly</h3>
                              <p className="text-gray-600">Struktur kode yang disukai Google untuk membantu website Anda naik peringkat.</p>
                         </div>
                    </div>
               </div>
          </section>
     )
}
