import { Star } from 'lucide-react'
import React from 'react'

export default function Testimoni() {
     return (
          <section id="testimoni" className="py-20 bg-white">
               <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Kata Mereka</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {[
                              { name: "Budi Santoso", role: "Owner UMKM Sepatu", text: "Pengerjaannya sangat cepat dan hasilnya melebihi ekspektasi. Website toko saya jadi terlihat sangat profesional." },
                              { name: "Siti Rahma", role: "Manajer Pemasaran", text: "Sangat kooperatif diajak diskusi. Fitur custom yang saya minta bisa dieksekusi dengan baik. Recommended!" },
                              { name: "Andi Pratama", role: "Freelancer", text: "Harga sangat bersahabat untuk kualitas website seperti ini. Supportnya juga ramah." }
                         ].map((testi, index) => (
                              <div key={index} className="p-6 border border-gray-100 rounded-xl bg-orange-50/50 hover:shadow-lg transition duration-300">
                                   <div className="flex text-orange-400 mb-3 space-x-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                   </div>
                                   <p className="text-gray-600 italic mb-4">&quot;{testi.text}&quot;</p>
                                   <div>
                                        <h4 className="font-bold text-gray-800">{testi.name}</h4>
                                        <span className="text-sm text-gray-500">{testi.role}</span>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     )
}
